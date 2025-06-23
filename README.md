# 🧠 DesiLinkr Auth-Core Microservice

This is the **Authentication Microservice** of the **DesiLinkr** microservices architecture.  
It handles secure **user registration**, **login**, and **token-based authentication** using a scalable and testable backend structure.

---

## 🧰 Tech Stack

- 🟨 Node.js with TypeScript
- ⚙️ Express.js for HTTP routing
- 🧬 Prisma ORM with PostgreSQL
- 🔐 JWT for access & refresh tokens
- 🧪 Jest for unit & integration testing
- 🌀 PNPM as package manager
- 🐳 Docker & GitHub Actions Ready

---

## ✨ Features

- 🔐 Register and Login with hashed password (bcrypt)
- 📩 Email-based user identification
- 🧾 Plan-based access control (`Free`, `Core`, `Premium`)
- 🔁 Token refresh and session middleware
- 📦 Modular 4-layer architecture (Route → Controller → Service → Repo)
- 🧪 Mockable & testable with Jest
- 🚀 Ready for production with Docker

---

---

## 🧪 Run & Test Scripts

| Script                     | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| 🟢 `pnpm dev`              | Start app in dev mode with ts-watch                  |
| 🧱 `pnpm build`            | Compile TypeScript to JS in `dist/` folder           |
| 🚀 `pnpm start`            | Run compiled `dist/index.js`                         |
| 🔬 `pnpm test`             | Run all Jest tests                                   |
| 🧪 `pnpm test:unit`        | Run unit tests only (`jest.config.unit.ts`)          |
| 🧪 `pnpm test:integration` | Run integration tests (`jest.config.integration.ts`) |

---

## 🐳 Docker Usage

- 🛠 Build Docker Image

docker build -t shell_app .

- 🚀 Run the Container

docker run -p 8082:8082 --env-file .env auth-core

Make sure to set PORT=8082 and DATABASE_URL=... in .env

## 🧑‍💻 License

MIT License  
Copyright © 2025 Harsh Tagra, DesiLinkr  
See the [LICENSE](./LICENSE) file for details.
