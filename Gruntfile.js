module.exports = function (grunt) {
    grunt.file.defaultEncoding = 'utf8';

    var rq={
        options:{
            baseUrl:"app",
            optimize:'none',
            mainConfigfile:"app/main.js",
            paths: grunt.file.readJSON('app/config/exclude.json')
        }
    };

    grunt.file.expand({
        cwd:"app/action"
    },"**/*.js").forEach(function(file){
        var name=file.replace(/\.js$/,'');
        rq[name]={
            options:{
                name:"action/"+name,
                out:"<%=pz.ml%>/js/"+file,
                include:['main']
            }
        }
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pz: grunt.file.readJSON('app/config/jsmin.json'),
        /**压缩js*/
        uglify: {
            options: {
                /**生成注解*/
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                expand: true,
                cwd: "<%=pz.ml%>/",
                src: ["js/**/*.js", "!*.min.js"],
                dest: "<%=pz.ml%>/",
                ext: ".js"
            }
        },
        /**css压缩*/
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: "<%=pz.ml%>/",
                    src: ["css/*.css", "!*.min.css"],
                    dest: "<%=pz.ml%>/",
                    ext: ".css"
                }]
            }
        },
        /**清空.tmp下所有文件*/
        clean: {
            build: ["<%=pz.ml%>/**/*.*", "<%=pz.ml%>/"],
            testjs: ['<%= pz.ml%>/*.js'],
            js: ['<%= pz.ml%>/js/', '<%= pz.ml%>/js/*.*'],
            css: ['<%= pz.ml%>/css/', '<%= pz.ml%>/css/*.*', '<%= pz.ml%>/img/', '<%= pz.ml%>/img/*.*'],
            test:['<%= pz.ml%>/css/', '<%= pz.ml%>/css/*.*', '<%= pz.ml%>/img/', '<%= pz.ml%>/img/*.*','<%= pz.ml%>/js/', '<%= pz.ml%>/js/*.*']
        },
        /**复制*/
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "../",
                    src: "lib/ui/**/*.*",
                    dest: 'app/'
                }, {
                    expand: true,
                    cwd: "../",
                    src: "lib/css/**/*.*",
                    dest: "page/css/"
                }, {
                    expand: true,
                    cwd: "page/img/",
                    src: "**/*.*",
                    dest: "<%= pz.ml%>/img/"
                }]
            },
            test:{
                files:[{
                    expand:true,
                    cwd:"page/",
                    src:"img/**/*.*",
                    dest:"<%=pz.ml%>/"
                },{
                    expand:true,
                    cwd:"page",
                    src:["*.html","*.php"],
                    dest:"<%=pz.ml%>/"
                }]
            }
        },
        /**合并*/
        concat: {
            css: {
                options: {
                    separator: ""
                },
                files: grunt.file.readJSON("page/config/concat.json")
            }
        },
        /**编译less样式*/
        less: {
            build: {
                options: {
                    paths: ['page/css']
                },
                files: grunt.file.readJSON('page/config/less.json')
            }
        },
        /**替换所有文件前缀路径*/
        replace: {
            all: {
                src: ['<%=pz.ml%>/**/*.html', '<%=pz.ml%>/**/*.php'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,
                    to: "=\"<%=pz.static.proUrl %>/<%=pz.slotPro%><%=pz.package%>/<%=pz.name%>/$1"
                }, {
                    from: /\$page=(?:\'|\")(\w+)(?:\'|\")/g,
                    to: "$page='<%=pz.static.proUrl %>/<%=pz.slotPro%><%=pz.package%>/<%=pz.name%>/js/$1'"
                }, {
                    from: /\$debug\s?=\s?true/g,
                    to: "$debug=0"
                }, {
                    from: /(\$baseCssUrl\s?=\s?)'(\w|\/|\.)*'/g,
                    to: "$1'<%=pz.static.proUrl %>/<%=pz.slotPro%><%=pz.package%>/<%=pz.name%>/css/'"
                }, {
                    from: /(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,
                    to: "$1'<%=pz.static.proUrl %>/'"
                }]
            },
            css: {
                src: '<%=pz.ml%>/**/*.css',
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /url\(\s?(?:\"|\')?(\.)*\/img\/((?:\w+\/)*(?:\w|\-|\_)+\.(?:jpg|png|ico|svg|gif){1})\s?(?:\"|\')?\)/g,
                    to: 'url("<%=pz.static.proUrl %>/<%=pz.slotPro%><%=pz.package%>/<%=pz.name%>/img/$2?v=<%= new Date().getTime() %>")'
                }]
            },
            js: {
                src: ['<%=pz.ml%>/**/*.js', '<%=pz.ml%>/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: /\s*define\(\"\w+\".*function\(\)\{\}\)\;/g,
                    to: ""
                }]
            },
            test: {
                src: ['<%=pz.ml%>/**/*.html', '<%=pz.ml%>/**/*.php'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,
                    to: "=\"<%=pz.static.testUrl %>/<%=pz.slotTest%><%=pz.package%>/<%=pz.name%>/$1"
                }, {
                    from: /\$page=(?:\'|\")(\w+)(?:\'|\")/g,
                    to: "$page='<%=pz.static.testUrl %>/<%=pz.slotTest%><%=pz.package%>/<%=pz.name%>/js/$1'"
                }, {
                    from: /\$debug\s?=\s?true/g,
                    to: "$debug=0"
                }, {
                    from: /(\$baseCssUrl\s?=\s?)'(\w|\/|\.)*'/g,
                    to: "$1'<%=pz.static.testUrl %>/<%=pz.slotTest%><%=pz.package%>/<%=pz.name%>/css/'"
                }, {
                    from: /(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,
                    to: "$1'<%=pz.static.testUrl %>/<%=pz.slotTest%>'"
                }]
            },
            testcss: {
                src: '<%=pz.ml%>/**/*.css',
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /url\(\s?(?:\"|\')?(\.)*\/img\/((?:\w+\/)*(?:\w|\-|\_)+\.(?:jpg|png|ico|svg|gif){1})\s?(?:\"|\')?\)/g,
                    to: 'url("<%=pz.static.devUrl %>/<%=pz.slotTest%><%=pz.package%>/<%=pz.name%>/img/$2?v=<%= new Date().getTime() %>")'
                }]
            },
            dev: {
                src: ['<%=pz.ml%>/**/*.html', '<%=pz.ml%>/**/*.php'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,
                    to: "=\"<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/$1"
                }, {
                    from: /\$page=(?:\'|\")(\w+)(?:\'|\")/g,
                    to: "$page='<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/js/$1'"
                }, {
                    from: /\$debug\s?=\s?true/g,
                    to: "$debug=0"
                }, {
                    from: /(\$baseCssUrl\s?=\s?)'(\w|\/|\.)*'/g,
                    to: "$1'<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/css/'"
                }, {
                    from: /(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,
                    to: "$1'<%=pz.static.devUrl %>/<%=pz.slotDev%>'"
                }]
            },
            testHtml:{
                src: ['page/**/*.html', 'page/**/*.php'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,
                    to: "=\"<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/$1"
                }, {
                    from: /data-main=(?:\'|\")(\w+)(?:\'|\")/g,
                    to: "data-main='../.tmp/js/$1'"
                }, {
                    from: /\$debug\s?=\s?true/g,
                    to: "$debug=0"
                }, {
                    from: /baseCssUrl/g,
                    to: "../.tmp/css"
                }, {
                    from: /(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,
                    to: "$1'<%=pz.static.devUrl %>/<%=pz.slotDev%>'"
                }]
            },
            proHtml:{
                src: ['<%=pz.ml%>/**/*.html', '<%=pz.ml%>/**/*.php','page/**/*.html', 'page/**/*.php'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,
                    to: "=\"<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/$1"
                }, {
                    from: /data-main=(?:\'|\")(\w+)(?:\'|\")/g,
                    to: "data-main='<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/js/$1'"
                }, {
                    from: /\$debug\s?=\s?true/g,
                    to: "$debug=0"
                }, {
                    from: /baseCssUrl/g,
                    to: "<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/css"
                }, {
                    from: /(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,
                    to: "$1'<%=pz.static.devUrl %>/<%=pz.slotDev%>'"
                }]
            },
            devcss: {
                src: '<%=pz.ml%>/**/*.css',
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: /url\(\s?(?:\"|\')?(\.)*\/img\/((?:\w+\/)*(?:\w|\-|\_)+\.(?:jpg|png|ico|svg|gif){1})\s?(?:\"|\')?\)/g,
                    to: 'url("<%=pz.static.devUrl %>/<%=pz.slotDev%><%=pz.package%>/<%=pz.name%>/img/$2?v=<%= new Date().getTime() %>")'
                }]
            }
        },
        /**检查JS规范*/
        jshint: {
            all: {
                src: 'app/**/*.js'
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },
        /**文件上传*/
        'sftp-deploy': {
            /**测试环境*/
            test: {
                auth: {
                    host: '10.2.8.102',
                    port: 22,
                    authKey: 'key1'
                },
                cache: 'sftpCache.json',
                src: '<%= pz.ml%>/',
                dest: '/www/html/<%=pz.slotTest%>/<%=pz.package%>/<%=pz.name%>/',
                /**排除上传的一些文件*/
                exclusions: ['<%=pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            },
            /**开发环境*/
            dev: {
                auth: {
                    host: '10.2.8.102',
                    port: 22,
                    authKey: 'key1'
                },
                cache: 'sftpCache.json',
                src: "<%=pz.ml%>/",
                dest: "/www/html/<%=pz.package%>",
                //dest: "/www/html/<%=pz.slotDev%>/<%=pz.package%>/<%=pz.name%>",
                /**排除上传的一些文件*/
                exclusions: ['<%=pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            },
            /**线上环境*/
            pro: {
                auth:{
                    host: '10.2.8.102',
                    port: 22,
                    authKey: 'key1'
                },
                cache:'sftpCache.json',
                src:'<%=pz.ml%>/',
                dest:'/www/html/<%=pz.package%>/<%=pz.name%>',
                /**排除上传的一些文件*/
                exclusions: ['<%=pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            }
        },
        /**PC上图片自动合并插件*/
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: '<%=pz.ml%>/img/sprite/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: '<%=pz.ml%>/img/',
                // 替换后的背景路径，默认为 file.dest 和 spritedest 的相对路径
                spritepath: null,
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: false,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: '<%=pz.pkgDir%>/css/',
                    // 匹配规则
                    src: '*.css',
                    // 导出css和sprite的路径地址
                    dest: '<%=pz.pkgDir%>/css/',
                    // 导出的css名
                    ext: '.css'
                }]
            }
        },
        requirejs:rq,
        /**监听所有代码改变，执行对应的插件实时更新代码*/
        watch:{
            js:{
                files:"app/**/*.js",
                tasks:["newer:clean:js","requirejs","replace:js"]
            },
            css:{
                files:"page/css/**/*.less",
                tasks:["less","sprite"],
                options:{
                    livereload:true
                }
            }
        },
        /**图片压缩插件，优化图片*/
        imagemin:{
            dist:{
                options:{
                    optimizationLevel:5
                },
                files:[{
                    expand:true,
                    cwd:'page/img',
                    src:['**/*.{png,jpg,gif}'],
                    dest:'<%=pz.ml%>/img'
                }]
            }
        },
        /**压缩html*/
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:[{
                    expand:true,
                    cwd:'page',
                    src:"**/*.html",
                    dest:"<%=pz.ml%>/"
                }]
            }
        },
        /**sass编译*/
        sass:{
            dist:{
                options:{
                    style:"expanded"
                },
                files:grunt.file.readJSON('page/config/sass.json')
            }
        },
        /**ftp文件上传*/
        'ftp-deploy':{
            dev:{
                auth:{
                    host: '10.2.8.102',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%=pz.ml%>/',
                dest: '/www/<%=pz.slotDev%>/<%=pz.package%>/<%=pz.name%>/',
                exclusions: ['<%= pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db', 'path/to/dist/tmp']
            },
            test:{
                auth:{
                    host:'10.2.8.102',
                    port:21,
                    authKey:'key1'
                },
                src:"<%=pz.ml%>/",
                dest:'/www/<%=pz.slotTest%>/<%=pz.package%>/<%=pz.name%>/',
                exclusions: ['<%= pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db', 'path/to/dist/tmp']
            },
            pro:{
                auth:{
                    host:'10.2.8.102',
                    port:21,
                    authKey:'key1'
                },
                src:"<%=pz.ml%>/",
                dest:'/www/<%=pz.slotPro%>/<%=pz.package%>/<%=pz.name%>/',
                exclusions: ['<%= pz.ml%>/**/.DS_Store', '<%=pz.ml%>/**/Thumbs.db', 'path/to/dist/tmp','<%=pz.ml%>/img']
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    //grunt.loadNpmTasks("grunt-contrib-htmlmin");
    //grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks("grunt-css-sprite");
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-ftp-deploy');


    grunt.registerTask("default", ['watch']);
    grunt.registerTask("clear:test", ['clean:test']);
    grunt.registerTask("clear:build", ['clean:build']);
    grunt.registerTask("jsmin:main", ['uglify:main']);
    grunt.registerTask("jsmin:test", ['uglify:test']);
    grunt.registerTask("concat:all", ['concat']);
    grunt.registerTask("copy:all", ['copy:test']);
    grunt.registerTask("js", ['requirejs']);
    grunt.registerTask("css:main", ['cssmin:main']);
    grunt.registerTask("css:test", ['cssmin:test']);
    grunt.registerTask("css:less", ['less']);
    grunt.registerTask("css:sass", ['sass']);
    grunt.registerTask("replace:html", ['replace:testHtml']);
    grunt.registerTask("replace:css", ['replace:css']);
    //grunt.registerTask("image:min", ['imagemin']);
    //grunt.registerTask("htmlmin", ['htmlmin']);
    grunt.registerTask("release:sass", ["clean:css", 'copy:main','sass','cssmin']);
    grunt.registerTask("release:less", ["clean:css", 'copy:main','less','cssmin']);



    grunt.registerTask("pro", ['clear:test','copy:test','less','js','sprite','replace:proHtml','cssmin','uglify']);
    grunt.registerTask("commit:dev",['ftp-deploy:dev']);
    grunt.registerTask("commit:test",['ftp-deploy:test']);
    grunt.registerTask("commit:pro",['ftp-deploy:pro']);
}