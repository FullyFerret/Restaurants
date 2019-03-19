## New Age Solutions Test

1.	How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
  
  4 hours; add tests, use advanced datatable library (for pagination, sorting by column), query more than by name field, fix aesthetic issues

2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

  Promises
  
```javascript
Promise.all(promises).then((data) => {
    if (!data || data.length < 2) {
        return;
    }

    console.log(`${this.title}: promiseToPlayAudioVideoSynced promise all resolved`);

    let audioWave = data.pop();
    let videoElements = data;


    if (this.audioDeferredPromise) {
        this.audioDeferredPromise = null;
    }

    if (this.videoDeferredPromises) {
        this.videoDeferredPromises.length = 0;
    }

    if (this.isActive) {
        for (let videoElement of videoElements) {
            if (videoElement && $(videoElement).length && !videoElement.playing) {
                videoElement.play();
            }
        }
        if (!audioWave.isPlaying()) {
            audioWave.play();
            let playPromise = audioWave.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    this.pause();
                });
            }
        }
    }
    else {
        console.log(`${this.title}: promiseToPlayAudioVideoSynced promise all pause audio and videos`);
        this.pause();
        this.pauseVideos();
    }

    resolve();

})
    .catch((e) => {
        console.error(e);
        if (this.audioDeferredPromise) {
            this.audioDeferredPromise = null;
        }

        if (this.videoDeferredPromises) {
            this.videoDeferredPromises.length = 0;
        }
    });
```

3.	How would you track down a performance issue in production? Have you ever had to do this?

  For css related performance, I'd use the performance tab and inspect the the most excessively painting elements. From there,  I'd try to adjust styling attributes and see if composite rendering can done instead (ie. use transform3ds for positioning) so that the graphics card can be leveraged for acceleration. With JavaScript, I would also utilize the developer tools and investigate bottlenecks and errors using the debugger. I would try to adjust the logic to improve time complexity where applicable.

4.	How would you improve the API that you just used?

  Allow disjointed queries (name OR address OR city ... ect), get cities by name (instead of all of them at once)

5.	Please describe yourself using JSON.

```json
{
	"name": "Eric",
	"birthdate": "1993-11-02T00:00:00Z",
	"university": "McMaster",
	"degree": "Business Informatics, B.ASc",
	"web_technologies": ["React", "ES6", "JavaScript", "php", "symfony", "doctrine", "python", "AWS", "ElasticSearch"],
	"last3Jobs": [{
		"UILab Inc.": "Full-stack Developer"
	}, {
		"Travel Nation.": "Operations Coordinator/Web Developer"
	}, {
		"CIBC": "Application Consultant"
	}],
	"yearsOfGuitarPlaying": 12,
	"guitars": ["Ibanez S7320", "La Patrie", "Cruzer"],
	"ampCount": 1,
	"isLookingForNewChallengingWork": true
}
```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
