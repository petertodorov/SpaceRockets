# SpaceRockets
Lounching Rockets

Open folder MyRocketGame

Execute in cmd:

'npm install'

'npm run build'

'Npm start'

Go to http://localhost:8080/

Choose a speed by clicking on one of the buttons. Normal speed burns one tone per second. Fast burns 100 tones per second

After the end you can replay the lounching by clicking the replay button

The data for rockets - names, fuel, etc is loaded dinamycally from SpaceX API and will be reloaded on replay.

The rocket icons show the status of each rocket.

When stage one is empty the bottom half dissapers.

When stage second is empty the rocket icon and the rocket dissapers.

If the rocket touches the upper boundary it stays there until the fuel is gone. The thrust remains to show the rocket still has fuel.
