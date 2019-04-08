# SpaceRockets
Lounching Rockets

Open folder MyRocketGame

Execute in cmd:

`npm install`

`npm run build`

`Npm start`

Open in browser http://localhost:8080/

Choose a speed by clicking on one of the buttons. 

Normal speed burns one tone per second.

![Imgur](https://i.imgur.com/1DUbeCv.png)

Fast burns 100 tones per second
![Imgur](https://i.imgur.com/Fbbh8bb.png)

After the end you can replay the lounching by clicking the replay button
![Imgur](https://i.imgur.com/I0udI77.png)

The data for rockets - names, stages'fuel etc.  is loaded dinamycally from SpaceX API and will be reloaded on replay.

The rocket icons show the status of each rocket and dissapear when the total fuel of the rocket is depleted.
![Imgur](https://i.imgur.com/aRXs0tD.png)

When the fuel of the rocket's stage one is empty the bottom half of the relevant rocket dissapers.

![Imgur](https://i.imgur.com/4pIArz3.png)

When the fuel of the rocket's stage second is empty the rocket icon and the top part and thrust of the relevant rocket dissapers.
![Imgur](https://i.imgur.com/BtMSwMH.png)

If the rocket touches the upper boundary it stays there until the fuel is gone. The thrust remains to show the rocket still has fuel.
![Imgur](https://i.imgur.com/HdN0Pd4.png)
