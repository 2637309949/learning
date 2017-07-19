#### 基本
[Three Levels of the REST Maturity Model（重要**）](https://www.infoq.com/news/2010/03/RESTLevels)  
[RESTful 架构详解](http://www.runoob.com/w3cnote/restful-architecture.html)  
#### WEB 安全  
 1. HTTP安全要点
>     www-Authenticate  
>         Http Base           --base64的凭证、容易被拦截破译
>         Http Digest         --response值计算、中间者破译
>     HTTPS
>         传输层的机密性和完整性、防疫中间者、TLS握手

 2. 身份标识、OpenID
>     HTTP身份认证+HTTPS增加了服务本身的负担即跟踪用户信息，使用提供者提供身份验证
 3. OAuth协议
 4. 黑客攻防
#### HTTP动词总结（很多应用都没做到位的，二级），抛弃返回200在传递一个JSON数据来传递信息

##### 1.save，create等创造资源的请求
    curl -X PUT -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78" http://192.168.99.100:12345/v1/AUTH_test/my44
    // 情况一：201--请求成功并且服务器创建了新的资源
    // curl -X PUT -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78" http://192.168.99.100:12345/v1/AUTH_test/my44
    HTTP/1.1 201 Created
    Content-Length: 0
    Content-Type: text/html; charset=UTF-8
    X-Trans-Id: tx6e1ba69b760242dc8ee43-00596eae05
    Date: Wed, 19 Jul 2017 00:55:33 GMT
    // 情况二：304--禁止访问资源（用户已认证，但是访问了无权限的地址）
    // curl -X PUT -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78" http://192.168.99.100:12345/v1/AUTH_test_XXX/my44
    HTTP/1.1 403 Forbidden
    Content-Length: 73
    Content-Type: text/html; charset=UTF-8
    X-Trans-Id: txdadaffd785c54605acc3d-00596ec75f
    Date: Wed, 19 Jul 2017 02:43:43 GMT
    // 情况三：401--用户未认证
    // curl -X PUT -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78_XXX" http://192.168.99.100:12345/v1/AUTH_test/my44
    HTTP/1.1 401 Unauthorized
    Content-Length: 131
    Content-Type: text/html; charset=UTF-8
    Www-Authenticate: Swift realm="AUTH_test"
    X-Trans-Id: txed5a69ff130b457da2f5a-00596ec7cf
    Date: Wed, 19 Jul 2017 02:45:35 GMT
    // 情况四：411--标头长度不合适（类似GET的404）
    // curl -X PUT -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78_XXX" http://192.168.99.100:12345/v1/AUTH_test/my44/xxx
    HTTP/1.1 411 Length Required
    Content-Length: 75
    Content-Type: text/html; charset=UTF-8
    X-Trans-Id: tx1f9a2cdf41734f0eb552c-00596ec85f
    Date: Wed, 19 Jul 2017 02:47:59 GMT
    // 情况五：400--服务器不理解请求的语法（例如：某个参数没提供，这种情况也可以用404泛指）
    // 情况六：422--Unprocessable Entity（例如：某个参数未满足条件，如类型应用为int确提供了boolean的）
    // 情况七：417--服务器未满足”期望”请求标头字段的要求（请求头的字段未满足要求）
##### 2.get，query等获取资源的请求
    //例子：
    // 情况一：200--请求成功，服务器通常返回数据，如html
    // curl -X GET -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78" http://192.168.99.100:12345/v1/AUTH_test
    HTTP/1.1 200 OK
    Content-Length: 5
    Accept-Ranges: bytes
    X-Timestamp: 1500425733.35692
    X-Account-Bytes-Used: 0
    X-Account-Container-Count: 1
    Content-Type: text/plain; charset=utf-8
    X-Account-Object-Count: 0
    X-Trans-Id: tx5b619c3dbe98415b96b95-00596eafdf
    Date: Wed, 19 Jul 2017 01:03:27 GMT
    // 情况二：304--禁止访问资源（用户已认证，但是访问了无权限的地址）
    // 情况三：401--用户未认证
    // 情况四：404--资源不存在
    // curl -X GET -i -H "X-Auth-Token: AUTH_tk4cb0a815c61b4a7e8b5b36782c1c1a78" http://192.168.99.100:12345/v1/AUTH_test/XXX
    HTTP/1.1 404 Not Found
    Content-Length: 70
    Content-Type: text/html; charset=UTF-8
    X-Trans-Id: txca71d11948e94baa81950-00596ecab0
    Date: Wed, 19 Jul 2017 02:57:52 GMT
    // 情况五：400--服务器不理解请求的语法（例如：某个参数没提供，这种情况也可以用404泛指）
    // 情况六：422--Unprocessable Entity（例如：某个参数未满足条件，如类型应用为int确提供了boolean的）
    // 情况七：417--服务器未满足”期望”请求标头字段的要求（请求头的字段未满足要求）
##### 3.其他情况参考openstack rest api（非常推荐使用）
[object-storage](https://developer.openstack.org/api-ref/object-storage/?expanded=delete-container-detail,show-account-details-and-list-containers-detail)  
