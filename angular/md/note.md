<p><meta charset="utf-8"></p>
<p><meta name="viewport" content="width=device-width"></p>
<p><link rel="stylesheet" href="./../../stylesheets/styles.css"></p>
<link rel="stylesheet" href="./../../stylesheets/github-light.css">
<meta name="keywords" content="react,angualr,ng-if,ngif,ng-switch,ng-switch-when" />
<meta name="description" content="Angular，指令的条件语句" />

 ### 选择什么样的框架？
 *选择什么样的框架？就要了解框架的核心价值！不是所有的都是和你的项目*

 * #### Jquery 全能小战士

 * #### Angular 数据双向绑定
  ---
     ```html

         <div ng-model="isShow">
             <div ng-switch-when="true">我是否会被发现</div>
         </div>

     ```
     *ng-show/ng-hide指令是个简化style="display: none;"隐藏DOM元素的技巧.这些元素没有被DOM树移除.*

 * #### React V-DOM 完美单项数据流
  ____
    ```HTML
    React.createClass("HelloWorlod",function(){
            
            return {

            }
        })
    ```
