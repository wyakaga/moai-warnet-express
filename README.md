<h2>Requirements</h2>

* NodeJS 18.x
* MongoDB

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone this repository</p>

```bash
git clone https://github.com/wyakaga/moai-warnet-express.git
```

<p>2. Change the working directory into folder directory</p>

```bash
cd moai-warnet-express
```

<p>3. Install with npm</p>

```bash
npm install
```

<p>4. Create .env file</p>

```env
DATABASE_URL = [your MongoDB url]
```

<p>7. Seed database</p>

```bash
npx prisma generate
npx prisma db seed
```

<p>6. Run with npm</p>

```bash
npm run dev
```

<h2>Table Structure</h2>

Take a look at the `scheme.prisma` file

<h2>Postman Documentation</h2>

Take a look at the [postman collection](moai-warnet_postman.json) to run the API by import it