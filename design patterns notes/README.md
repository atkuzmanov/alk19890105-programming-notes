# Design Pattern notes

|||singleton pattern using enum
|||design pattern
|||pattern
|||java design pattern
|||scala design pattern

```java
public enum StubServerFactory {
    INSTANCE;

    private final StubServer stubServer;

    StubServerFactory() {
        stubServer = new StubServer("localhost", 9095);
        stubServer.startStubServer();
    }

//    public static StubServerFactory getInstance() {
//        return INSTANCE;
//    }

    public StubServer getStubServer() {
        return stubServer;
    }
}
```

---

<http://www.dotnetfunda.com/articles/article1597-software-patterns-grasp-summary-of-article-series.aspx>

<http://www.dotnetfunda.com/articles/article1487-software-patterns-grasp-part-ii-information-expert-.aspx>
<http://www.dotnetfunda.com/articles/article1492-software-patterns-grasp-part-iii-creator-.aspx>
<http://www.dotnetfunda.com/articles/article1499-software-patterns-grasp-part-iv-controller-.aspx>
<http://www.dotnetfunda.com/articles/article1518-software-patterns-grasp-part-v-low-coupling-.aspx>
<http://www.dotnetfunda.com/articles/article1522-software-patterns-grasp-part-vi-high-cohesion-.aspx>
<http://www.dotnetfunda.com/articles/article1548-software-patterns-grasp-part-vii-polymorphism-.aspx>
<http://www.dotnetfunda.com/articles/article1559-software-patterns-grasp-part-viii-pure-fabrication-.aspx>
<http://www.dotnetfunda.com/articles/article1578-software-patterns-grasp-part-ix-indirection-.aspx>
<http://www.dotnetfunda.com/articles/article1592-software-patterns-grasp-part-x-protected-variations-.aspx>

<http://sourcemaking.com/design_patterns/adapter/java/1>
<http://sourcemaking.com/design_patterns/composite/java/1>
<http://en.wikipedia.org/wiki/Decorator_pattern>
<http://en.wikipedia.org/wiki/Facade_pattern>
<http://en.wikipedia.org/wiki/Proxy_pattern>

<http://en.wikipedia.org/wiki/Strategy_pattern>
<http://en.wikipedia.org/wiki/Template_method_pattern>
<http://en.wikipedia.org/wiki/Command_pattern>
<http://sourcemaking.com/design_patterns/observer/java/1>

---
