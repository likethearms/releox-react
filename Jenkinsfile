node {
  def app
  def scmVars
  def CONTAINER_REGISTRY = 'https://eu.gcr.io'

  try {
    stage('Clone repository') {
      scmVars = checkout scm
      echo "scmVars: ${scmVars}"
      echo "ENV: "
      echo sh(returnStdout: true, script: 'env')
    }

    docker.image('node:10').inside {
      stage('Test') {
        withCredentials([string(credentialsId: 'releox-react-cc', variable: 'TOKEN')]){
          sh './test-reporter-latest-linux-amd64 before-build'
          sh 'npm --version'
          sh 'npm install'
          sh 'npm run lint'
          sh 'CI=true npm run test -- --coverage'
          sh 'npm run build'
          sh 'GIT_COMMIT=$(git log | grep -m1 -oE "[^ ]+$")'
          sh "./test-reporter-latest-linux-amd64 after-build -r ${TOKEN} -t lcov"
        }
      }
    }
  } finally {
    stage('Clean workspace'){
      deleteDir()
    }
  }
}
