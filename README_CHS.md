# 安卓计算器模拟器

一个网页计算器模拟器的安卓版本  
[查看原版](https://github.com/CalcWorld/Web-Calc-Emulator/tree/master)  
**仅供学习和研究目的，严禁用于商业用途！**  

---
[English](https://github.com/aosumi-rena/Android-Calc-Emulator/blob/master/README.md) | [简体中文](https://github.com/aosumi-rena/Android-Calc-Emulator/blob/master/README_CHS.md)
---

## 如何使用
推荐使用[HBuilderX](https://www.dcloud.io/hbuilderx.html)或任何其他兼容的IDE编译应用。然后将apk或ipa安装到你的安卓或iOS设备上。  
<sub>注：纯萌新，第一次尝试制作安卓软件，所以选择了比较简单的HBuilderX，如果你要使用其他IDE的话可能会缺少一些文件，请自行补全</sub>  
此存储库中没有可用的模型。你必须在编译应用之前自行查找/提取并导入。  

### HBuilderX流程
1. 打开HBuilderX，选择"新建项目"。
2. 选择"uni-app"模板，填写项目信息并创建项目。
3. 将本存储库中的文件复制到新建项目的相应目录中。
4. 根据 [导入多个模型](#导入多个模型) 的说明导入计算器模型文件。
5. 在HBuilderX中，选择"运行"->"运行到手机或模拟器"->"运行到Android App基座"进行调试。或使用相应的iOS选项。
6. 如果一切正常，选择"发行"->"打包成APK或IPA"，然后按照提示完成打包。

## 导入单个模型
运行模拟器，然后切换到 **添加自定义模型** 面板以导入单个模型。  
- **模型 ID**：必须以 `CY` 或 `EY` 开头，以指示模型类型。  
- **模型名称**：模型的名称，可以是任何名称。  
- **模型文件**：需要3个文件，分别为`core.dat`（或`rom.bin`）、`face.svg`和`keylog.json`。  
   `core.dat`：计算器的 ROM 文件，可以是原始文件或加密文件。  
   `face.svg`：计算器面板的 SVG 文件。  
   `keylog.json`：计算器的 keylog 文件，用于将按键代码映射到按键名称。  
如果一切导入正确，模型将在模拟器内部的模型列表中运行并显示出来。  

## 导入多个模型
如果你想设定一些"预设"模型到你的软件内，可按照以下步骤操作。  
1. 在`root/static/emulator/`目录下创建一个名为`data`的文件夹。  
2. 在`data`文件夹中为每个模型创建文件夹，并使用模型ID命名。  
3. 将以下3个文件（`core.dat`、`face.svg`和`keylog.json`）放入你刚刚创建的每个文件夹中。  
4. 在任何文本编辑器中打开`root/static/emulator/index.html`，找到`const emulatorList = {};`开头的文本。  
    根据以下格式修改内容：  
    ```javascript
    const emulatorList = {
      "EY***": {
        "name": "fx-***",
        "background": "#3A3A3A"
      },
      // ...... 更多模型
    };
    ```
    请保证每个Key使用的是模型的ID，每个Key对应的值是模型的名称。

5. 找到以`const emulatorGroup = [];`开头的行
    在其中编辑内容，格式如下：  
    ```javascript
    const emulatorGroup = [
      {
        "shortName": "**",
        "name": {
          "en": "**",
          // ...... 其他语言
        },
        "models": [
          "EY***",
          "CY***",
          // ...... 更多模型
        ]
      },
      // ...... 更多分组
    ]
    ```
    `shortName`：分组的简称。  
    `name`：支持多语言的分组全名。  
    `models`：包含该分组内模型ID的数组。

6. 运行模拟器，如果一切正常，你将看到导入的模型出现在模型列表中。

## 许可

- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
