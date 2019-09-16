## Call Stack

- `JavaScript` 는 단일 스레드 언어이므로 단일 `callstack`  이 존재한다.

  ​	``` 한 번에 하나의 Task 만 처리할 수 있다 ```

- 동작은 일반적인 `stack` 과 비슷하다.

- 단일 스레드이므로 하나의 처리에 너무 오랜시간이 소요된다면 다른 함수를 처리 할 수 없고

  같은 이유로 `stack overflow` 가 쉽게 나타날 수 있다.

> 이런 이유로 '이벤트 큐' 를 사용한 '비동기 콜백' 이 필요하다.



## Event Queue

- `Call Stack` 에서 Task 를 수행하는 동안 처리해야 될 Task 를 임시적으로 저장하는 대기 큐
- `Task Queue` 또는 `Event Queue` 라고 한다.
- Queue 이므로 FIFO 순서로 수행된다.
- Queue 의 Task 들은 `Call Stack` 의 동작이 끝나야지만 `Event Loop`에 의해 처리된다.



## Event Loop

`Task` 를 핸들링하는 역할을 한다.

```
while (queue.waitForMessage()) {
	queue.processNextMessage();
}
```

MDN 의 설명에 따르면 위 코드와 같다.

프로세스의 최상단에서 위의 while 문이 동작한다고 보면 된다.

1. Call Stack` 에서 Task 를 처리하는 동안 이벤트가 발생하면 `Event Queue`에 넣는다.

2. `Event Queue`는 대기 중에 있다가 `Stack`이 비는 시점에 `Event Loop` 를 통해 

   `queue` 의 내용을 `stack` 에 넣어준다.

3. 단일 스레드 이기 때문에 `Stack `에서 Task가 처리되는 동안 `Event Queue` 는

   `stack` 을 체크하는 `polling` 동작이 중지된다.

4.  (2. ~ 3.) 을 반복한다.