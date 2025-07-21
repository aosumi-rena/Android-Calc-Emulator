# Android Calculator Emulator

This is a simple Android app version for the community-driven web calculator emulator.

[Visit the original version](https://github.com/CalcWorld/Web-Calc-Emulator/tree/master)

**FOR STUDYING AND LEARNING PURPOSES ONLY. COMMERCIAL USE IS NOT ALLOWED.**

---
[English](https://github.com/aosumi-rena/Android-Calc-Emulator/blob/master/README.md) | [简体中文](https://github.com/aosumi-rena/Android-Calc-Emulator/blob/master/README_CHS.md)
---

## How To Use

Compile the app using [HBuilderX](https://www.dcloud.io/hbuilderx.html) or any other compatible IDE. Then install the apk or ipa on your Android or iOS device.  
<sub><sup>P.S. This is my first time creating an Android app, and chosen HBuilderX as my IDE (as its easier), there may be some missing files required for compiling using other IDE.</sup></sub>

Please note that there's no available models in this repository. You have to find and import them by yourself **before** compiling the app.  

### HBuilderX Process
1. Open HBuilderX and select "New Project".
2. Choose the "uni-app" template, fill in the project information, and create the project.
3. Copy the files from this repository into the corresponding directories of the newly created project.
4. In HBuilderX, select "Run" -> "Run to phone or emulator" -> "Run to Android app base" for debugging. Or corresponding options for iOS.   
<sub><sub>P.S. I don't have the exact i18n for these options at the moment, choose the closest option</sub></sub>
5. If everything works fine, select "Release" -> "Package as APK or IPA", and follow the prompts to complete the packaging.

## Import Single Model

Run the emulator, and then switch to **Add Custom Model** panel to import a single model.

- **Model ID**: Required to start with `CY` or `EY` in order to indicate the model type.

- **Model Name**: The name of the model, can be whatever you like.

- **Model File**: 3 files are needed, which are `core.dat` (or `rom.bin`), `face.svg` and `keylog.json`.

   `core.dat` file: the ROM file of the calculator, can be either raw or encrypted.

   `face.svg` file: an SVG file of the calculator's faceplate.

   `keylog.json` file: the keylog file of the calculator, which is used to map the key codes to the key names.

If everything imported correctly, the model will be run and displayed in the model list inside the emulator.

## Import Multiple Models

If you want to create "preset" models for the app, follow the steps below to import them all at once.

1. Create a folder named `data` at `root/static/emulator/`.

2. Create folders for each model in the `data` folder, and name it with the model ID.

3. Put the 3 files (`core.dat`, `face.svg` and `keylog.json`) in each folder you just created.

4. Open `root/static/emulator/index.html` in any text editor, find the line begin with `const emulatorList = {};` 

    Edit the content in the following format:

    ```javascript
    const emulatorList = {
      "EY***": {
        "name": "fx-***",
        "background": "#3A3A3A"
      },
      // ...... other models
    };
    ```
   Named each key with the model ID, the value for each key is an object containing the name and the background color of the model.

5. Find the line begin with `const emulatorGroup = [];` 

   Edit the content in the following format:

    ```javascript
    const emulatorGroup = [
      {
        "shortName": "**",
        "name": {
          "en": "**",
          // ...... other languages
        },
        "models": [
          "EY***",
          "CY***",
          // ...... other models
        ]
      },
      // ...... other groups
    ]
    ```
   `shortName` : the short name of the group.

   `name` : the full name of the group that supports multiple languages.

   `models` : an array containing the model IDs of the models in the group.

6. Run the emulator, then you can see the imported models in the model list if everything goes correctly.

## License

- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
