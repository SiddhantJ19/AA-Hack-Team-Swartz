##Flow

User <====> Twillio <=====> this app

1.User calls the number
2.Twillio hits the webhook registered for our service
3.Our service returns the commands for twillio to perform
4.Twillio's Programmable voice follows the commands recieved. 

### Setup

1. Create a twillio account and get a phone number with voice enabled. 
2. Clone this repo and run ``` npm start ``` 
3. Install ngrok
4. run ``` ngrok http 5431 ``` 
5. Use the public ip recieved via ngrok as a webhook url for your twillio number
