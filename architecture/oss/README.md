### Nodejs 实现oss（所有OSS需解决跨域问题）
[（跨域采用预登录ticket方式，不推荐里面的nodejs架构）](https://segmentfault.com/a/1190000006103655)  
[Basic Authentication + Tikcet（JWT） + Session(认证方式)](https://github.com/deitch/cansecurity)  
### cas(比较成熟推荐)
[CAS（其实原理都差不多）（TGC(cookie) 登录前判断是否存在TGC，若存在就发送TGT,TGT (tikcet)访问protect server时的临时票据，protect server验证成功后建立sess）](https://www.apereo.org/projects/cas)  
