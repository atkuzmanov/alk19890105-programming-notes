# CircleCI notes

## Configuring CircleCI

<https://circleci.com/docs/2.0/configuration-reference/>

## Using Environment Variables

<https://circleci.com/docs/2.0/env-vars/>

## Automate GitHub Releases with CircleCI

<https://circleci.com/blog/publishing-to-github-releases-via-circleci/>

<https://discuss.circleci.com/t/git-commit-message-in-environment-variable/533>

<https://discuss.circleci.com/t/using-the-git-branch-to-run-different-commands/21250/6>

<https://stackoverflow.com/questions/50570221/circleci-2-0-working-with-subdirectory>

```bash
.circleci/config.yml
```

```yaml
version: 2
workflows:
  version: 2
  test-and-build:
    jobs:
      - build:
          filters:
            tags:
              only: /.*/
      - publish-nexus:
          requires:
            - build
          filters:
            branches:
              ignore: /.*/
            tags:
              only: /^\d+\.\d+\.\d+$/

jobs:
  build:
    docker:
      - image: coco/dropwizardbase-internal:v1.0.3
    steps:
      - checkout
      - run:
          name: Maven
          command: mvn clean verify
  publish-nexus:
    docker:
      - image: coco/dropwizardbase-internal:v1.0.3
    steps:
      - run:
          name: Publish Tag to Nexus repository
          command: |
            echo 'export HASH=$(git log -1 --pretty=format:%H)' >> $BASH_ENV
            echo 'export VERSION_TAG=$(git tag -l --points-at $HASH | head -n1)' >> $BASH_ENV
            source ${BASH_ENV}
            mvn versions:set -DnewVersion=${VERSION_TAG}
            mvn versions:commit
            mvn deploy
```

```xml
    <groupId>com.example</groupId>
    <artifactId>example</artifactId>
    <version>2.5.2</version> <!-- This cannot be a variable, only maven version plugin can modify this. -->
```
