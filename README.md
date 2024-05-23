# Nutech Interview Test : Node.js developer
This is, Nutech Interview Test : Node.js developer - By Nando

See hosted project : https://nutech-assesmenttest-assesmenttest.up.railway.app

### HOW TO RUN
Install all dependency
> npm install

build in Development mode
> sequelize db:migrate:all

> sequelize db:seed:all

run in Development mode
> npm run dev

## ERD
![release-0](ERD.png)

## Module Membership

**POST /membership/registration** 

API Registration Public (Tidak perlu Token untuk mengaksesnya)

Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi

Ketentuan :

Parameter request email harus terdapat validasi format email
Parameter request password Length minimal 8 karakter
Handling Response sesuai dokumentasi Response dibawah

Request Body

```json
{
  "email": "user@nutech-integrasi.com",
  "first_name": "User",
  "last_name": "Nutech",
  "password": "abcdef1234"
}
```

Response 200

```json
{
  "status": 0,
  "message": "Registrasi berhasil silahkan login",
  "data": null
}
```

Response 400

```json
{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}
```

Response 401

```json
{
  "message": "Invalid email/password"
}
```
&nbsp;

**POST /membership/login**  
API Login Public (Tidak perlu Token untuk mengaksesnya)

Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)

Ketentuan :

Parameter request email harus terdapat validasi format email
Parameter request password Length minimal 8 karakter
JWT yang digenerate harus memuat payload email dan di set expiration selama 12 jam dari waktu di generate
Handling Response sesuai dokumentasi Response dibawah

Request Body

```json
{
  "email": "user@nutech-integrasi.com",
  "password": "abcdef1234"
}
```

Response 200

```json
{
  "status": 0,
  "message": "Login Sukses",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U"
  }
}
```

Response 400

```json
{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}
```

Response 401

```json
{
  "message": "Invalid email/password"
}
```
&nbsp;

**GET /membership/profile**

API Profile Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi profile User

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Handling Response sesuai dokumentasi Response dibawah


Response 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User",
    "last_name": "Nutech",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
  }
}
```

Response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```
&nbsp;

**PUT /membership/profile/update** 
 API Update Profile Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mengupdate data profile User

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Handling Response sesuai dokumentasi Response dibawah

Request Body

```json
{
  "first_name": "User Edited",
  "last_name": "Nutech Edited"
}
```

Response 200

```json
{
  "status": 0,
  "message": "Update Pofile berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
  }
}
```

Response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```
&nbsp;

**PUT /membership/profile/image**  
API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mengupdate / upload profile image User

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Format Image yang boleh di upload hanya jpeg dan png
Handling Response sesuai dokumentasi Response dibawah

Response 200

```json
{
  "status": 0,
  "message": "Update Profile Image berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile-updated.jpeg"
  }
}
```

Response 400

```json
{
  "status": 102,
  "message": "Format Image tidak sesuai",
  "data": null
}
```

Response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```
&nbsp;

## Module Information
**GET /information/banner**  
API Banner Public (tidak memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan list banner

Ketentuan :

Buat data list banner sesuai dokumentasi Response dibawah, usahakan banner ini tidak di hardcode, melainkan ambil dari database
Tidak perlu membuatkan module CRUD banner
Handling Response sesuai dokumentasi Response dibawah

Response 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "banner_name": "Banner 1",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 2",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 3",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 4",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 5",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 6",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    }
  ]
}
```

Response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;

**GET /information/services**  
API Services Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan list Service/Layanan PPOB

Ketentuan :

Buat data list Service/Layanan sesuai dokumentasi Response dibawah, usahakan data list Service atau Layanan ini tidak di hardcode, melainkan ambil dari database
Tidak perlu membuatkan module CRUD Service/Layanan
Handling Response sesuai dokumentasi Response dibawah

Response 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "service_code": "PAJAK",
      "service_name": "Pajak PBB",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PLN",
      "service_name": "Listrik",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 10000
    },
    {
      "service_code": "PDAM",
      "service_name": "PDAM Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PULSA",
      "service_name": "Pulsa",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PGN",
      "service_name": "PGN Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "MUSIK",
      "service_name": "Musik Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "TV",
      "service_name": "TV Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "PAKET_DATA",
      "service_name": "Paket data",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "VOUCHER_GAME",
      "service_name": "Voucher Game",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 100000
    },
    {
      "service_code": "VOUCHER_MAKANAN",
      "service_name": "Voucher Makanan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 100000
    },
    {
      "service_code": "QURBAN",
      "service_name": "Qurban",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 200000
    },
    {
      "service_code": "ZAKAT",
      "service_name": "Zakat",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 300000
    }
  ]
}
```

Response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;

## Module Transaction
**POST /transaction**  
API Transaction Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk melakukan transaksi dari services / layanan yang tersedia

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi
Pada saat Transaction set transaction_type di database menjadi PAYMENT
Handling Response sesuai dokumentasi Response dibawah
Response invoice_number untuk formatnya generate bebas

Request Body

```json
{
  "service_code": "PULSA"
}

```
Response 200

```json
{
  "status": 0,
  "message": "Transaksi berhasil",
  "data": {
    "invoice_number": "INV17082023-001",
    "service_code": "PLN_PRABAYAR",
    "service_name": "PLN Prabayar",
    "transaction_type": "PAYMENT",
    "total_amount": 10000,
    "created_on": "2023-08-17T10:10:10.000Z"
  }
}
```

Response 400

```json
{
  "status": 102,
  "message": "Service ataus Layanan tidak ditemukan",
  "data": null
}
```

response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;

**GET /transaction/balance**  
API Balance Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Handling Response sesuai dokumentasi Response dibawah

Response 200

```json
{
  "status": 0,
  "message": "Get Balance Berhasil",
  "data": {
    "balance": 1000000
  }
}
```

response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;

**GET /transaction/history**  
ory Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi history transaksi

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Terdapat parameter limit yang bersifat opsional, jika limit tidak dikirim maka tampilkan semua data
Data di order dari yang paling baru berdasarkan transaction date (created_on)
Handling Response sesuai dokumentasi Response dibawah

Response 200

```json
{
  "status": 0,
  "message": "Get History Berhasil",
  "data": {
    "offset": 0,
    "limit": 3,
    "records": [
      {
        "invoice_number": "INV17082023-001",
        "transaction_type": "TOPUP",
        "description": "Top Up balance",
        "total_amount": 100000,
        "created_on": "2023-08-17T10:10:10.000Z"
      },
      {
        "invoice_number": "INV17082023-002",
        "transaction_type": "PAYMENT",
        "description": "PLN Pascabayar",
        "total_amount": 10000,
        "created_on": "2023-08-17T11:10:10.000Z"
      },
      {
        "invoice_number": "INV17082023-003",
        "transaction_type": "PAYMENT",
        "description": "Pulsa Indosat",
        "total_amount": 40000,
        "created_on": "2023-08-17T12:10:10.000Z"
      }
    ]
  }
}
```

response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;


**POST /transaction/topup**  
API Topup Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk melakukan top up balance / saldo dari User

Ketentuan :

Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
Setiap kali melakukan Top Up maka balance / saldo dari User otomatis bertambah
Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0
Pada saat Top Up set transaction_type di database menjadi TOPUP
Handling Response sesuai dokumentasi Response dibawah

Request Body

```json
{
  "top_up_amount": 1000000
}
```
Response 200

```json
{
  "status": 0,
  "message": "Top Up Balance berhasil",
  "data": {
    "balance": 2000000
  }
}
```

response 400

```json
{
  "status": 102,
  "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  "data": null
}
```

response 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```

&nbsp;
