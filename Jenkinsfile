pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/digiabhi/React_CRM.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo "Building React app..."
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'npm test -- --watchAll=false'  // run tests once without watch mode
            }
            post {
                always {
                    junit 'test-results/**/*.xml' // If you configure jest to output JUnit xml reports
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying React app..."
                // Add your deploy script or commands here, e.g., upload build folder to server
                sh './deploy.sh'
            }
        }
    }

    post {
        success {
            echo "ReactJS pipeline succeeded!"
        }
        failure {
            echo "ReactJS pipeline failed!"
        }
    }
}
