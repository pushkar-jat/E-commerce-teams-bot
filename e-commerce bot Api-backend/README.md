# E-Commerce Bot Api Server
 
<br />
<p align="center">
  <img src="ecommerce-bot-frontend/image/logo.png" alt="Logo" width="100" height="100">
  <h1 align="center">E-Commerce_bot online shoping Api server</h1>
  <p align="center">
    This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to create a simple bot that accepts input from the user and echoes it back.
  </p>
</p>
 

<img src="ecommerce-bot-frontend/image/cardss.png">      
We developed this project to ease shopping using teams where Api server workign as middleware to handle database.

Tables are:-

1. Profile table&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
2. Cart table&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 
3. Home table&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 
4. Shopping product table  
5. Payment table  
6. orders table  
7. Login/Signup table

Once we have update database the product list shown in product pages and also we can update in database for add new product or change the quantity or price.  


If you want to know more about the project then checkout [E-commerce wiki](https://www.notion.so/E-Commerce-Bot-cefafcf5a319429c8d06fe42d56eff05) or have an [overview of E-commerce](hhttps://www.notion.so/E-Commerce-Bot-cefafcf5a319429c8d06fe42d56eff05). 

**We don't encourage any bad use of this project and in no case, we code authors are liable to any damage or illegal action.**
</br>
</br>

<!-- TABLE OF CONTENTS -->
## Table of Contents
* [Prerequisites](#Prerequisites) 
* [To run the bot](#Torunthebot)
* [Testing the bot using Bot Framework Emulator](#TestingthebotusingBotFrameworkEmulator)
* [Connect to the bot using Bot Framework Emulator](#ConnecttothebotusingBotFrameworkEmulator) 
* [License](#license)
</br>
</br>


This bot api server code has been created using [MongoDB](https://mongodb.org), it shows how to create a database that accepts input from the user and echoes it back.

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher

    ```bash
    # determine node version
    node --version
    ```

## To run the bot

- Install modules

    ```bash
    npm install
    ```

- Start the api server

    ```bash
    npm index.js or node index.js
    ```

## Testing the api server in bot or check databse connect or not in command line/console
->  connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`
- Enter url in env file

## Deploy the api server to Azure

To learn more about deploying a api server to Azure, see [Deploy your services to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

 




## Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Dialogs](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0)
- [Gathering Input Using Prompts](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)



 
 

## License <i id="license"></i>
  * [MIT](https://github.com/AtiqGauri/Patternscape/blob/master/LICENSE)