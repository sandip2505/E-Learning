import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Question {
id: string;
question: string;
options: string[];
correctAnswer: number;
}

interface Quiz {
id: string;
title: string;
description: string;
questions: Question[];
timeLimit: number; // in minutes
}

export default function QuizScreen() {
const { quizId } = useLocalSearchParams();
const router = useRouter();

const [quiz, setQuiz] = useState<Quiz | null>(null);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
const [timeRemaining, setTimeRemaining] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [isSubmitted, setIsSubmitted] = useState(false);
const [score, setScore] = useState(0);

useEffect(() => {
    // Mock quiz data - replace with actual API call
    const mockQuiz: Quiz = {
        id: quizId as string,
        title: 'React Native Fundamentals',
        description: 'Test your knowledge of React Native basics',
        timeLimit: 30,
        questions: [
            {
                id: '1',
                question: 'What is React Native?',
                options: [
                    'A web framework',
                    'A mobile app development framework',
                    'A database',
                    'A programming language'
                ],
                correctAnswer: 1
            },
            {
                id: '2',
                question: 'Which company developed React Native?',
                options: ['Google', 'Apple', 'Facebook', 'Microsoft'],
                correctAnswer: 2
            },
            {
                id: '3',
                question: 'What language is primarily used in React Native?',
                options: ['Java', 'Swift', 'JavaScript', 'Python'],
                correctAnswer: 2
            }
        ]
    };

    setQuiz(mockQuiz);
    setTimeRemaining(mockQuiz.timeLimit * 60);
    setIsLoading(false);
}, [quizId]);

useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
        const timer = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
        handleSubmitQuiz();
    }
}, [timeRemaining, isSubmitted]);

const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
    }));
};

const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
};

const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
};

const calculateScore = () => {
    if (!quiz) return 0;
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
            correctAnswers++;
        }
    });
    return Math.round((correctAnswers / quiz.questions.length) * 100);
};

const handleSubmitQuiz = () => {
    Alert.alert(
        'Submit Quiz',
        'Are you sure you want to submit your answers?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Submit',
                onPress: () => {
                    const finalScore = calculateScore();
                    setScore(finalScore);
                    setIsSubmitted(true);
                }
            }
        ]
    );
};

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

if (isLoading) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading Quiz...</Text>
            </View>
        </SafeAreaView>
    );
}

if (!quiz) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Quiz not found</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

if (isSubmitted) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.resultContainer}>
                <Ionicons 
                    name={score >= 70 ? "checkmark-circle" : "close-circle"} 
                    size={80} 
                    color={score >= 70 ? "#4CAF50" : "#F44336"} 
                />
                <Text style={styles.resultTitle}>Quiz Completed!</Text>
                <Text style={styles.scoreText}>Your Score: {score}%</Text>
                <Text style={styles.resultMessage}>
                    {score >= 70 ? 'Congratulations! You passed!' : 'Keep studying and try again!'}
                </Text>
                <TouchableOpacity 
                    style={styles.finishButton} 
                    onPress={() => router.back()}
                >
                    <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const currentQuestion = quiz.questions[currentQuestionIndex];

return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{quiz.title}</Text>
            <View style={styles.timerContainer}>
                <Ionicons name="time" size={16} color="#FF6B6B" />
                <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
                <View 
                    style={[
                        styles.progressFill, 
                        { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }
                    ]} 
                />
            </View>
            <Text style={styles.progressText}>
                {currentQuestionIndex + 1} of {quiz.questions.length}
            </Text>
        </View>

        <ScrollView style={styles.content}>
            {/* Question */}
            <View style={styles.questionContainer}>
                <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedAnswers[currentQuestion.id] === index && styles.selectedOption
                        ]}
                        onPress={() => handleAnswerSelect(currentQuestion.id, index)}
                    >
                        <View style={styles.optionContent}>
                            <View style={[
                                styles.optionCircle,
                                selectedAnswers[currentQuestion.id] === index && styles.selectedCircle
                            ]}>
                                {selectedAnswers[currentQuestion.id] === index && (
                                    <Ionicons name="checkmark" size={16} color="#FFF" />
                                )}
                            </View>
                            <Text style={[
                                styles.optionText,
                                selectedAnswers[currentQuestion.id] === index && styles.selectedOptionText
                            ]}>
                                {option}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
            <TouchableOpacity
                style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledButton]}
                onPress={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
            >
                <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuiz}>
                    <Text style={styles.submitButtonText}>Submit Quiz</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            )}
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
},
errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
},
backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
},
backButtonText: {
    color: '#FFF',
    fontWeight: '600',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
},
headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
},
timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
},
timerText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
},
progressContainer: {
    padding: 16,
    backgroundColor: '#FFF',
},
progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
},
progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
},
progressText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
},
content: {
    flex: 1,
    padding: 16,
},
questionContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
},
questionNumber: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
},
questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
},
optionsContainer: {
    gap: 12,
},
optionButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
},
selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
},
optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
},
optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
},
selectedCircle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
},
optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
},
selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
},
navigationContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
},
navButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
},
disabledButton: {
    opacity: 0.5,
},
navButtonText: {
    color: '#666',
    fontWeight: '600',
},
nextButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
},
nextButtonText: {
    color: '#FFF',
    fontWeight: '600',
},
submitButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
},
submitButtonText: {
    color: '#FFF',
    fontWeight: '600',
},
resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 16,
},
scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
},
resultMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
},
finishButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
},
finishButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
},
});