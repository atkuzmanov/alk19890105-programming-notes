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
