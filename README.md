# Cronjob Mail

Verifi email dan schedule

## Authors

-   [Nanang Setiawan](https://github.com/livingdolls/)

## 🚀 About Me

I'm a full stack developer and i think im funny

## Tech Stack

**Server:** Express JS, Mysql, Prisma, Nodemailer,snmp google, jwt, bcrypt

## API

SignUp User

```bash
  POST http://localhost:3001/api/auth/signUp
  {
    "email" : "gmail@mail.com",
    "password" : "1231313131"
  }
```

Sign User

```bash
  POST http://localhost:3001/api/auth/sign
  {
    "email" : "gmail@mail.com",
    "password" : "1231313131"
  }
```

Ganti Email

```bash
 PUT http://localhost:3001/api/auth/change-email/:idUser
 {
  "email" : "@mail.com"
 }
```

Lihat Wallet

```bash
  GET http://localhost:3001/api/wallet/
```
