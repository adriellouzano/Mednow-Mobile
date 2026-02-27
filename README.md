# MedNow Mobile — Aplicativo de Monitoramento de Medicação
<p align="center">
<img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" />
</p>

##  Sobre o Projeto

O **MedNow Mobile** é a aplicação móvel do sistema **MedNow**, desenvolvida como parte do Trabalho de Conclusão de Curso (TCC). O aplicativo é destinado principalmente aos pacientes, permitindo acompanhar prescrições,
registros de administração de medicamentos e receber alertas sonoros diretamente no dispositivo móvel.

---

##  Projeto Relacionado

Versão Web do sistema:

 https://github.com/adriellouzano/Mednow-Web

---

##  Funcionalidades

* Login e autenticação segura de usuários
* Visualização de prescrições médicas
* Monitoramento de alarmes de medicação
* Integração com API do MedNow Web

---

##  Arquitetura

Aplicação mobile baseada em **React Native + Expo**:

```
Mobile App (React Native / Expo)
            │
            ▼
      API REST (Next.js)
            │
            ▼
      PostgreSQL Database
```

---

##  Tecnologias Utilizadas

* React Native
* Expo
* JavaScript
* React Navigation
* Axios 
* JWT 

---

##  Estrutura do Projeto

```
src/
 ├── componentes/     → Componentes reutilizáveis
 ├── telas/           → Telas do aplicativo
 ├── rotas/           → Navegação entre páginas
 ├── servicos/        → Comunicação com API
 └── utilitarios/     → Funções auxiliares
```
---
##  Observação

O ambiente completo de desenvolvimento mobile exige configuração de Android Studio
e emuladores. Por esse motivo, disponibilizei um APK pronto para facilitar
a validação funcional do sistema.3

---
##  Download do Aplicativo (APK)

Para facilitar a avaliação e testes, uma versão compilada do aplicativo está disponível:

 **Baixar APK:**  
https://drive.google.com/file/d/1sSXD8vjK2EUUAYSQBZ2pDGn4WU4Bd1Mr/view?usp=drive_link

⚠️ É necessário permitir instalação de aplicativos de fontes desconhecidas no Android.

O aplicativo conecta-se diretamente ao servidor oficial do MedNow.

##  Segurança

* Autenticação baseada em JWT
* Tokens armazenados localmente com AsyncStorage
* Comunicação segura com API
* Dados clínicos protegidos por autenticação

---

##  Objetivo Acadêmico

Projeto desenvolvido para aplicação prática de:

* Desenvolvimento Mobile
* Integração Fullstack
* APIs REST
* Segurança da Informação
* Experiência do Usuário em sistemas de saúde

---

##  Autor

**Adriel Rodrigues Louzano**
Projeto acadêmico — 2025

---

##  Licença

Uso educacional e acadêmico.
