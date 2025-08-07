FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/springboot-ci-demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "app.jar"]
