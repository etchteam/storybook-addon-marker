# Storybook Addon Marker

A Storybook Addon to add a [Marker.io](https://marker.io/) feedback button in [Storybook](https://storybook.js.org).

![React Storybook Screenshot](https://raw.githubusercontent.com/etchteam/storybook-addon-marker/master/screenshot.png)

## Installation

```sh
npm install @etchteam/storybook-addon-marker --save-dev
```

## Configuration

Create a file called `main.js` in your `.storybook` config folder.

Add the following content to it:

```js
module.exports = {
  addons: ['@etchteam/storybook-addon-marker']
}
```

Then create a file called `preview.js` in the same folder and add your [Marker destination](https://marker.io/blog/integrate-web-app-browser-sdk) as a [parameter](https://storybook.js.org/docs/react/writing-stories/parameters):

```js
export const parameters = {
  marker: {
    destination: 'abcd1234567890', // <- Your unique destination ID
  }
}
```

It's possible to pass other Marker options to the `marker` parameter, either globally or per story. For example, custom metadata can be passed per story with the `customData` property:

```js
export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    marker: {
      customData: {
        story: 'Page'
      }
    }
  }
};
```

Where to find your Marker destination and other Marker configuration options can be found on the [Marker SDK documentation](https://marker.io/blog/integrate-web-app-browser-sdk).

Made with ☕ at [Etch](https://etch.co)