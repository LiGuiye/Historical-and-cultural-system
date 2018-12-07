# Historical-and-cultural-system
途说史话V1.0
## 需求分析
	“天生我材必有用，千金散尽还复来。”即使是一千多年前的诗句，现在读来，依旧可以感受到诗人当时跌宕起伏的情感。  
	古诗词不仅仅展现了古人深厚的文化底蕴，反映当时的社会状况，也教会了我们许多做人的道理，陶冶情操、净化心灵。  
	然而现代社会较快的节奏，让心变得浮躁，人变得匆忙，忽视了这传统文化的重要性。  
	且传统古诗词的当代发展困境，主要体现为阅读的局限性、无法随时随地阅读学习古诗词、诗词体量少、无法便捷分享等。  
	在互联网时代，利用网络进行中华古典诗词的弘扬与传承具有重要意义。

	本系统旨在培养大众学习诗词的兴趣，挖掘新的兴趣产生方式，引导社会学习传统文化的新风尚；  
	为广大诗词学习的爱好者提供一个更加集中的平台，去交流和分享自己的作品，去获得不一样的灵感；  
	为初、高学生的古诗词学习提供更直观、更高效、更生动、更深刻的学习方式；  
	将诗词文化与互联网＋相结合，把诗词的魅力展现在大众面前，助力传统文化的推广和宣传。
## V1.0版本思路
  ## 设计思路
  ![设计思路图片加载失败](https://github.com/LiGuiye/Historical-and-cultural-system/blob/master/docs/%E8%AE%BE%E8%AE%A1%E6%80%9D%E8%B7%AF%E5%9B%BE.jpg)
  ## 系统框架
  ![系统架构图片加载失败](https://github.com/LiGuiye/Historical-and-cultural-system/blob/master/docs/%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE.jpg)  
  
	系统基于JavaScript运行环境，参考Nodejs全栈开发思想，采用B/S结构。
	利用ArcGIS Pro对数据进行处理后通过ArcGIS Enterprise和ArcGIS Online将本地数据发布为在线的网络服务、地图服务和要素服务。
	使用PostgreSQL数据库，存储用户数据和从[古诗文网](https://www.gushiwen.org/)爬取的诗词数据。
	基于TensorFlow使用LSTM循环神经网络对唐宋诗词数据分别进行训练，形成诗词创作模型。
	前端使用bootstrap框架对网站页面进行美化，调用ArcGIS API for JavaScript和百度语音合成API，利用js和python联动。  
	以达到对数据进行可视化和提供创作诗词朗读功能、调用预训练的诗词创作模型实现创作诗词前端显示的目的。
	用户浏览器通过WEB服务器与数据库进行数据交互，可以大大减少用户计算负载，方便展示和使用。
## 详细信息
	系统中用到的shp数据以及数据库备份均已上传至/data  
	详细介绍文档和系统概述已上传/docs
## 寄语：V1.0~版本
	相信大家也已经看到，我们的系统存在一个很突出的问题，就是过于依赖商业软件Arcgis。  
	这让我们很受制于人，也不利于系统的版本迭代且有悖于我们弘扬传统文化的初心。
	所以希望后面加入我们团队的朋友们可以参考一下QGIS+PostGIS+PostgreSQL+Geoserver+Node.js+Leaflet这套框架。  
	其优点就在于简单易上手，且全部为开源。  
	期待大家在将系统功能复现的同时，可以增强系统的鲁棒性，优化用户体验，为弘扬中华传统文化做出属于自己的一点贡献。
