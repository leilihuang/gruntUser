###为了方便大家工作搭建了这套环境，不足之处共同修改，共同进步
###安装流程

* 下载node.js 地址https://nodejs.org/ , 安装完成后验证 node -v
* 下载grunt 安装命令 npm install grunt-cli -g ,详细安装教程http://jingyan.baidu.com/article/93f9803fe354ede0e46f5585.html
* 在项目目录下执行 npm install 下载环境所需要的grunt插件
* sass编译需要配置ruby和sass环境,ruby下载地址:百度一下就有哈,ruby安装详细教程：http://jingyan.baidu.com/article/48b558e33558ac7f38c09aee.html
* sass安装查看sass官网详细教程http://www.w3cplus.com/sassguide/install.html

> 绑定事件注意
* PC端  js 点击事件绑定用on去绑定click，尽可能用id元素
* H5移动端 js点击事件用on去绑定tap，尽可能用id元素

### 使用自动化框架的调整

* PC端，原有的_v1.2css文件不动，修改样式还是在上面修改，修改之后执行合并样式合并命令 grunt concat:all （合并的配置文件参考page/concat.json配置），
   新页面统一引用seo下面的css文件，样式编译命令参考下面，配置文件参考下面。
* 当所有页面使用seo下面的样式的时候，页面上只需要引用合并最终得到的样式，所有的图片都放在seo下的img里面
* 所有的页面js都写在gruntWork/app下面，action文件下面写入口，service文件下面写逻辑，参考已有的文件进行编写，最后得到的js在seo下

###配置文件信息

* 样式合并的文件在pge/concat.json,要合并的样式参考，上面的配置
* 样式编译的文件默认用less，在page/less.json,配置信息参考已有的
* 可选sass样式编译的文件用sass，在page/sass.json,配置信息参考已有的（要修改配置文件）
* 环境默认配置文件在app/config/jsmin.json文件

###常用命令
grunt clear              .tmp文件夹下所有内容
grunt css:sass           编译sass样式  //需要在sass.json里面配置，参考例子
grunt css:less           编译less样式  //需要在marge.json里面配置，参考例子
grunt concat:all         合并_v1.2css下面的css文件,配置文件在page下面concat.jsond
grunt cssmin:main            seo下的css压缩样式
grunt cssmin:test       webapp/_v1.2css压缩到  css文件下
replace:testcss          替换图片路径，改为服务器路径
grunt release:sass       编译压缩样式，拷贝图片到.tmp文件目录下(不建议使用)
grunt release:less       编译压缩样式，拷贝图片到.tmp文件目录下
grunt js                 自动合并js   //action为合并js入口 , service下写逻辑，同一个页面逻辑放到同一个文件夹下
grunt jsmin:main         seo下的压缩js
grunt jsmin:test         webapp/_v1.2js压缩到  js文件下
grunt watch              实时监控所有代码，当代码改变时，自动重新编译
grunt img:min            压缩图片
grunt html:min           压缩html
grunt pro               一键编译，合并，压缩
grunt css:pro               一键编译，合并，压缩
grunt commit:pro        上传到ftp服务器

###操作流程
* 先编译less============================================================（grunt css:less）
* 合并js================================================================(grunt js)
* 开启实时监控命令,关闭实时监控按ctrl+c======================================================（grunt watch）
* 页面开发完毕，执行压缩命令============================================（grunt pro）
* 上传到ftp服务器=======================================================(grunt commit:pro  )
* 图片手动上传到ftp服务器

> 上传资源
1：开发环境带上分支号，默认为s2  路径配置在app/config/jsmin.json文件中
  "slotTest":"",
  "slotDev":"s2/",
  "slotPro":"",
2：线上环境默认是根目录


###注意现在只有2套环境就是开发环境和线上环境，图片默认路径不一样开发环境带分支号，线上不带分支号
1：开发环境执行
grunt dev              编译js css 拷贝图片到.tmp目录下，替换样式背景图片url路径   //路径配置在app/config/jsmin.json文件中 分别对应static下的devUrl
grunt commit:dev       将.tmp目录下的所有文件放到开发服务器上

2：测试环境执行
grunt test            编译js css 拷贝图片到.tmp目录下，替换样式背景图片url路径   //路径配置在app/config/jsmin.json文件中 分别对应static下的testUrl
grunt commit:test     将.tmp目录下的所有文件放到测试服务器上

3：线上环境执行
grunt pro             编译js css 拷贝图片到.tmp目录下，替换样式背景图片url路径   //路径配置在app/config/jsmin.json文件中 分别对应static下的provUrl
grunt commit:pro      将.tmp目录下的所有文件放到开发服务器上，让运维同步更新目录文件，将代码放到线上环境

所有代码默认是提交到 ftp://10.2.8.102/www/   文件夹下面


