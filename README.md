# Project Overview

This project is designed to create a chatbot AI that integrates with OpenAI's powerful language model (gpt-4-turbo). It aims to provide intelligent and context-aware conversational capabilities, making it significant for applications in customer support, virtual assistants, and interactive user experiences.

# Installation Instructions

To install this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/wtakayama-chwy/chatbot-openai
   ```
2. Navigate to the project directory
3. Install the necessary dependencies:
   ```bash
   pnpm install
   ```

# Usage Guidelines

To use this project locally:

```bash
pnpm run dev
```

# Features
https://github.com/user-attachments/assets/a53b620b-52cb-40cc-a248-a0d3b87b2d4d
- **OpenAI chat:** Integrates with OpenAI's language models to provide intelligent and context-aware responses. 
- **Message history:** Stores and retrieves past conversations to maintain context and improve user interactions.
- **E2E test:** End-to-end testing to ensure the chatbot functions correctly from start to finish. To run E2E test:
```bash
pnpm e2e:ui
```
![e2e-test](https://github.com/user-attachments/assets/16b84921-530e-4ca7-9dff-8b4e7681c031)


# Additional Information

- Currently, data persistence is limited to the local environment using SQLite.
- The deployed version is experiencing issues related to the API_KEY, and is currently non-functional. The deployment was conducted solely to demonstrate the deployment process.

## Deploy on Vercel

- Deployed version: https://chatbot-openai-psi.vercel.app/en-US
![deployed-vercel](https://github.com/user-attachments/assets/5bca5301-8843-4ba0-aaf2-6f2d98e5538f)
