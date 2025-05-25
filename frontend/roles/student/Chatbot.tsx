import React, { useState } from "react";
import { Box, Button, Text, VStack, ScrollView } from "native-base";

const chatbotData = [
  {
    question: "How long is the academic plan?",
    answer:
      "If you're pursuing a Bachelor's in Engineering (BE), it typically takes 5 years. A Master's degree would take an additional 2 years.",
    followUps: [
      {
        question: "How long is one semester?",
        answer: "Each semester is typically around 4 months long.",
      },
      {
        question: "How many exams are there?",
        answer:
          "There are regular tests, a midterm exam, and a final exam. You may also face quizzes based on the instructor's plan.",
      },
    ],
  },
  {
    question: "What are the contact numbers for Student Affairs?",
    answer: "You can contact Student Affairs at: 09785557706 or 09785557709.",
  },
  {
    question: "Where is the school located?",
    answer:
      "The school is located at 73rd Street, Ngu Shwe Wah Street, Chan Mya Tharzi Township, Mandalay Region, Myanmar.",
    followUps: [
      {
        question: "How big is the school campus?",
        answer: "The campus spans 7 acres.",
      },
    ],
  },
  {
    question: "How many majors are there?",
    answer:
      "There are two majors: Computer Science and Engineering (CSE) and Electronics and Communication Engineering (ECE). Master's degree options are also available.",
    followUps: [
      {
        question: "How many students can enroll each year?",
        answer:
          "120 students in total — 60 for each major, with some additional students accepted occasionally.",
      },
      {
        question: "How is the entrance exam evaluated?",
        answer:
          "60% of your entrance score and 40% of your final high school exam score are considered.",
      },
    ],
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [options, setOptions] = useState(chatbotData);

  const handleQuestionClick = (qa: any) => {
    setMessages((prev) => [...prev, `Q: ${qa.question}`, `A: ${qa.answer}`]);
    if (qa.followUps) {
      setOptions(qa.followUps);
    } else {
      setOptions(chatbotData);
    }
  };

  return (
    <Box flex={1} safeArea p={4} bg="white">
      <ScrollView flex={1} mb={4}>
        <VStack space={2}>
          {messages.map((msg, idx) => (
            <Text key={idx}>{msg}</Text>
          ))}
        </VStack>
      </ScrollView>
      <VStack space={2}>
        {options.map((item, idx) => (
          <Button key={idx} onPress={() => handleQuestionClick(item)}>
            {item.question}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default ChatBot;
