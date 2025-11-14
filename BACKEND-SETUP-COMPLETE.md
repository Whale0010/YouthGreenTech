================================================================================
                    GUIDE COMPLET — CONSTRUCTION DU BACKEND
                   Youth Green Tech — Next.js + MongoDB + NextAuth
================================================================================

CONTEXTE ACTUEL :
✓ Frontend Next.js (React 19.2.0) — OK
✓ NextAuth configuré (authentification JWT)
✓ Package.json avec bcryptjs, mongodb, zod — OK
✓ Git push vers GitHub — OK

À FAIRE :
1. Initialiser MongoDB (local ou cloud)
2. Créer schémas/modèles de données
3. Implémenter API routes (users, profile, contact, etc.)
4. Intégrer authentification avec base de données
5. Créer middlewares de validation
6. Configurer environment variables
7. Tester les API routes
8. Déployer vers Vercel/GitHub Pages

================================================================================
PHASE 1 : SETUP DATABASE (MongoDB)
================================================================================

OPTION A : MongoDB Local (Windows)
───────────────────────────────────
1) Télécharger et installer MongoDB Community Edition
   https://www.mongodb.com/try/download/community

2) Vérifier que le service mongod est en cours d'exécution
   Ouvrir PowerShell en Admin :
   
   Get-Service mongod | Select-Object Status
   
   Si arrêté, démarrer :
   Start-Service mongod

3) Connexion locale par défaut :
   Connection string : mongodb://localhost:27017/youthgreentech

OPTION B : MongoDB Cloud (Atlas) — RECOMMANDÉ (gratuit)
─────────────────────────────────────────────────────
1) Créer un compte : https://www.mongodb.com/cloud/atlas

2) Créer un cluster gratuit M0 (toujours gratuit)

3) Créer un utilisateur de base de données
   - Username : youthtech_user
   - Password : généré automatiquement (copiez-le)

4) Whitelist votre IP (ou 0.0.0.0 pour anywhere)

5) Récupérer la connection string :
   mongodb+srv://youthtech_user:PASSWORD@cluster0.xxxxx.mongodb.net/youthgreentech?retryWrites=true&w=majority

================================================================================
PHASE 2 : CONFIGURER ENVIRONMENT VARIABLES
================================================================================

Créer un fichier .env.local à la racine du projet :

Copier-coller (remplacez les valeurs) :

------- .env.local -------
# ===== DATABASE =====
MONGODB_URI=mongodb+srv://youthtech_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/youthgreentech?retryWrites=true&w=majority

# ===== NEXTAUTH =====
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here-use-openssl-rand-hex-32

# ===== MAIL (optionnel, pour formulaire contact) =====
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# ===== API KEYS (optionnel) =====
API_BASE_URL=http://localhost:3001/api

------- FIN .env.local -------

Générer NEXTAUTH_SECRET sécurisé (PowerShell) :
openssl rand -hex 32

================================================================================
PHASE 3 : CRÉER LE DOSSIER LIB/DB AVEC LES MODÈLES
================================================================================

Structure à créer :
app/lib/
├── db.js              # Connexion MongoDB
├── models/
│   ├── User.js        # Schéma utilisateur
│   ├── Contact.js     # Schéma formulaire contact
│   └── Post.js        # Schéma articles/actualités (optionnel)
└── utils/
    ├── validators.js  # Validation Zod
    └── auth.js        # Helpers authentification

================================================================================
PHASE 3.1 : Fichier de connexion MongoDB (app/lib/db.js)
================================================================================

Copier-coller et créer le fichier app/lib/db.js :

------- app/lib/db.js -------
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI est manquant dans .env.local");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Réutiliser la connexion en développement (hot reload)
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db("youthgreentech");

    // Test de connexion
    await db.admin().ping();
    console.log("✓ Connecté à MongoDB");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("✗ Erreur connexion MongoDB:", error.message);
    throw error;
  }
}

------- FIN app/lib/db.js -------

================================================================================
PHASE 3.2 : Modèle Utilisateur (app/lib/models/User.js)
================================================================================

Copier-coller et créer app/lib/models/User.js :

------- app/lib/models/User.js -------
import { ObjectId } from "mongodb";
import bcryptjs from "bcryptjs";
import { connectToDatabase } from "../db";

export const User = {
  async create(userData) {
    const { db } = await connectToDatabase();
    
    // Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    
    const user = {
      email: userData.email,
      displayName: userData.displayName || "Utilisateur",
      passwordHash: hashedPassword,
      interests: userData.interests || [],
      avatar: userData.avatar || null,
      role: userData.role || "member",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("users").insertOne(user);
    return { _id: result.insertedId, ...user };
  },

  async findByEmail(email) {
    const { db } = await connectToDatabase();
    return await db.collection("users").findOne({ email });
  },

  async findById(id) {
    const { db } = await connectToDatabase();
    return await db.collection("users").findOne({ _id: new ObjectId(id) });
  },

  async updateProfile(id, updateData) {
    const { db } = await connectToDatabase();
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result.value;
  },

  async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    
    const isValid = await bcryptjs.compare(password, user.passwordHash);
    return isValid ? user : null;
  }
};

------- FIN app/lib/models/User.js -------

================================================================================
PHASE 3.3 : Modèle Contact (app/lib/models/Contact.js)
================================================================================

Copier-coller et créer app/lib/models/Contact.js :

------- app/lib/models/Contact.js -------
import { connectToDatabase } from "../db";

export const Contact = {
  async create(contactData) {
    const { db } = await connectToDatabase();

    const contact = {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      status: "unread",
      createdAt: new Date()
    };

    const result = await db.collection("contacts").insertOne(contact);
    return { _id: result.insertedId, ...contact };
  },

  async getAll() {
    const { db } = await connectToDatabase();
    return await db
      .collection("contacts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  },

  async markAsRead(id) {
    const { db } = await connectToDatabase();
    return await db
      .collection("contacts")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "read", updatedAt: new Date() } }
      );
  }
};

------- FIN app/lib/models/Contact.js -------

================================================================================
PHASE 4 : CRÉER LES API ROUTES
================================================================================

Structure :
app/api/
├── auth/
│   ├── [...nextauth]/route.js         (déjà existant)
│   ├── register/route.js              (NOUVEAU)
│   └── verify-password/route.js       (NOUVEAU)
├── users/
│   ├── route.js                       (NOUVEAU — GET profil)
│   └── [id]/route.js                  (NOUVEAU — PUT update)
├── contact/
│   └── route.js                       (NOUVEAU)
└── health/
    └── route.js                       (NOUVEAU — vérification santé)

================================================================================
PHASE 4.1 : API Route — Inscription (app/api/auth/register/route.js)
================================================================================

Copier-coller et créer app/api/auth/register/route.js :

------- app/api/auth/register/route.js -------
import { User } from "@/app/lib/models/User";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Min 6 caractères"),
  displayName: z.string().min(2, "Min 2 caractères")
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Valider les données
    const validated = registerSchema.parse(body);

    // Vérifier que l'email n'existe pas
    const existingUser = await User.findByEmail(validated.email);
    if (existingUser) {
      return Response.json(
        { error: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    // Créer l'utilisateur
    const newUser = await User.create({
      email: validated.email,
      password: validated.password,
      displayName: validated.displayName
    });

    // Ne pas retourner le hash du mot de passe
    const { passwordHash, ...userWithoutPassword } = newUser;

    return Response.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

------- FIN app/api/auth/register/route.js -------

================================================================================
PHASE 4.2 : API Route — Formulaire Contact (app/api/contact/route.js)
================================================================================

Copier-coller et créer app/api/contact/route.js :

------- app/api/contact/route.js -------
import { Contact } from "@/app/lib/models/Contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Sujet requis"),
  message: z.string().min(10, "Message trop court")
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    const contact = await Contact.create(validated);

    return Response.json(contact, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Ajouter authentification admin ici si nécessaire
    const contacts = await Contact.getAll();
    return Response.json(contacts);
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

------- FIN app/api/contact/route.js -------

================================================================================
PHASE 4.3 : API Route — Santé (Health Check) (app/api/health/route.js)
================================================================================

Copier-coller et créer app/api/health/route.js :

------- app/api/health/route.js -------
import { connectToDatabase } from "@/app/lib/db";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    // Tester la connexion
    await db.admin().ping();

    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    return Response.json(
      {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}

------- FIN app/api/health/route.js -------

================================================================================
PHASE 5 : METTRE À JOUR NEXTAUTH POUR UTILISER LA BASE DE DONNÉES
================================================================================

Éditer app/api/auth/[...nextauth]/route.js :

Remplacer la fonction authorize() par :

------- REMPLACER DANS route.js -------
async authorize(credentials) {
  try {
    // Vérifier les identifiants dans la base de données
    const user = await User.verifyPassword(
      credentials.email,
      credentials.password
    );

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.displayName,
      role: user.role
    };
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    return null;
  }
}

------- FIN REMPLACER -------

================================================================================
PHASE 6 : CRÉER API ROUTE — PROFIL UTILISATEUR (app/api/users/route.js)
================================================================================

Copier-coller et créer app/api/users/route.js :

------- app/api/users/route.js -------
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/lib/models/User";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return Response.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return Response.json(userWithoutPassword);
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

------- FIN app/api/users/route.js -------

================================================================================
PHASE 7 : TESTER LE BACKEND LOCALEMENT
================================================================================

Étapes de test (PowerShell) :

1) Démarrer le serveur de développement :
─────────────────────────────────────────
npm run dev

Résultat attendu :
  ▲ Next.js 16.0.1
  - Local:        http://localhost:3001

2) Tester health check (dans un autre terminal) :
──────────────────────────────────────────────
$response = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing
$response.Content | ConvertFrom-Json | Format-List

Résultat attendu :
status : healthy
database : connected

3) Tester l'inscription :
─────────────────────────
$body = @{
    email = "test@example.com"
    password = "testpass123"
    displayName = "Test User"
} | ConvertTo-Json

$response = Invoke-WebRequest `
    -Uri "http://localhost:3001/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body `
    -UseBasicParsing

$response.Content | ConvertFrom-Json | Format-List

4) Tester le formulaire contact :
─────────────────────────────────
$contactBody = @{
    name = "Jean Dupont"
    email = "jean@example.com"
    subject = "Intéressé par le programme"
    message = "Je suis très intéressé par participer aux événements de l'association."
} | ConvertTo-Json

$response = Invoke-WebRequest `
    -Uri "http://localhost:3001/api/contact" `
    -Method POST `
    -ContentType "application/json" `
    -Body $contactBody `
    -UseBasicParsing

$response.Content | ConvertFrom-Json | Format-List

5) Vérifier les données dans MongoDB :
──────────────────────────────────────
Ouvrir MongoDB Compass ou utiliser mongosh :

mongosh "mongodb+srv://youthtech_user:PASSWORD@cluster0.xxxxx.mongodb.net/youthgreentech"

db.users.find()
db.contacts.find()

================================================================================
PHASE 8 : AJOUTER MIDDLEWARE DE VALIDATION
================================================================================

Créer app/lib/middleware.js (optionnel mais recommandé) :

------- app/lib/middleware.js -------
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(
      JSON.stringify({ error: "Non authentifié" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return { session };
}

export async function requireAdmin(request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    return new Response(
      JSON.stringify({ error: "Accès non autorisé" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return { session };
}

------- FIN app/lib/middleware.js -------

================================================================================
PHASE 9 : DÉPLOYER VERS VERCEL (RECOMMANDÉ)
================================================================================

1) Installer Vercel CLI :
───────────────────────
npm install -g vercel

2) Se connecter à Vercel :
──────────────────────────
vercel login

3) Déployer le projet :
────────────────────────
vercel

4) Configurer les environment variables :
──────────────────────────────────────────
Allez dans Vercel Dashboard → Settings → Environment Variables

Ajouter :
- MONGODB_URI (votre connection string Atlas)
- NEXTAUTH_URL=https://yourapp.vercel.app
- NEXTAUTH_SECRET (généré avec openssl rand -hex 32)

5) Redéployer après ajout des env vars :
──────────────────────────────────────────
vercel --prod

6) Vérifier le déploiement :
──────────────────────────────
curl https://yourapp.vercel.app/api/health

================================================================================
PHASE 10 : CHECKLIST FINALE
================================================================================

Backend Infrastructure :
  ☐ MongoDB configuré (local ou Atlas)
  ☐ .env.local créé avec toutes les variables
  ☐ app/lib/db.js créé (connexion MongoDB)
  ☐ app/lib/models/User.js créé
  ☐ app/lib/models/Contact.js créé
  ☐ app/api/auth/register/route.js créé
  ☐ app/api/contact/route.js créé
  ☐ app/api/health/route.js créé
  ☐ app/api/users/route.js créé
  ☐ NextAuth intégré avec base de données

Tests Locaux :
  ☐ npm run dev démarre sans erreur
  ☐ GET /api/health retourne "healthy"
  ☐ POST /api/auth/register crée un utilisateur
  ☐ POST /api/contact sauvegarde un message
  ☐ MongoDB contient les données

Déploiement :
  ☐ Code poussé vers GitHub
  ☐ Vercel connecté au repo
  ☐ Environment variables configurées
  ☐ npm run build exécute sans erreur
  ☐ Site live sur Vercel
  ☐ API /api/health accessible en production

Optional Améliorations :
  ☐ Ajouter rate limiting sur les API
  ☐ Ajouter validation CSRF
  ☐ Implémenter pagination pour les contacts
  ☐ Ajouter export CSV pour les contacts (admin)
  ☐ Implémenter "forgot password" (reset)
  ☐ Ajouter logs au backend

================================================================================
COMMANDES GIT POUR POUSSER LE BACKEND
================================================================================

Après avoir créé tous les fichiers backend :

git add app/api app/lib .env.local
git commit -m "Ajouter backend complet — API routes, MongoDB, NextAuth intégré"
git push origin main

================================================================================
STRUCTURE FINALE DU PROJET
================================================================================

mon-association/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.js         ✓ Mise à jour avec DB
│   │   │   └── register/route.js              ✓ NOUVEAU
│   │   ├── users/
│   │   │   └── route.js                       ✓ NOUVEAU
│   │   ├── contact/
│   │   │   └── route.js                       ✓ NOUVEAU
│   │   └── health/
│   │       └── route.js                       ✓ NOUVEAU
│   ├── lib/
│   │   ├── db.js                              ✓ NOUVEAU
│   │   ├── models/
│   │   │   ├── User.js                        ✓ NOUVEAU
│   │   │   └── Contact.js                     ✓ NOUVEAU
│   │   ├── middleware.js                      ✓ OPTIONNEL
│   │   └── validators.js
│   ├── components/
│   ├── auth/
│   ├── profile/
│   ├── page.js
│   └── layout.js
├── public/
├── .env.local                                 ✓ NOUVEAU
├── package.json                               ✓ Dépendances OK
└── next.config.mjs

================================================================================
RESSOURCES SUPPLÉMENTAIRES
================================================================================

Documentation :
- Next.js API Routes : https://nextjs.org/docs/api-routes/introduction
- NextAuth.js : https://next-auth.js.org/
- MongoDB Node.js : https://docs.mongodb.com/drivers/node/
- Zod Validation : https://zod.dev/

Tutoriels Utiles :
- Connexion MongoDB : https://www.mongodb.com/docs/drivers/node/current/quick-start/
- NextAuth Custom Providers : https://next-auth.js.org/providers/credentials
- Déploiement Vercel : https://vercel.com/docs

================================================================================
PROCHAINES ÉTAPES
================================================================================

1. Créer tous les fichiers listés (db.js, models, API routes)
2. Configurer .env.local avec MongoDB URI
3. Tester localement avec npm run dev
4. Exécuter les tests curl/PowerShell
5. Pousser le code vers GitHub
6. Déployer sur Vercel
7. Vérifier que la base de données fonctionne en production

Vous avez besoin d'aide pour une étape spécifique ?

================================================================================
