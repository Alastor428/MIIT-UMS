import React, { useState } from "react";
import {
  ScrollView,
  VStack,
  Box,
  Text,
  Heading,
  Divider,
  Button,
  Pressable,
} from "native-base";
import { Linking } from "react-native";

// Define props
interface GuestProps {
  onBack: () => void;
}

const Guest: React.FC<GuestProps> = ({ onBack }) => {
  const [showCSEInfo, setShowCSEInfo] = useState(false);
  const [showECEInfo, setShowECEInfo] = useState(false);
  const [showFCSInfo, setShowFCSInfo] = useState(false);
  const [showFCEInfo, setShowFCEInfo] = useState(false);
  const [showFCInfo, setShowFCInfo] = useState(false);
  const [showFNSInfo, setShowFNSInfo] = useState(false);

  const openMap = async () => {
    const url =
      "https://www.google.com/maps?q=Myanmar+Institute+of+Information+Technology";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      alert("Unable to open the map link.");
    }
  };

  const cseDescription = `
Computer science and engineering (CSE) or computer science (CS) also integrated as electrical engineering and computer science (EECS) in some universities, is an academic subject comprising approaches of computer science and computer engineering. There is no clear division in computing between science and engineering, just like in the field of materials science and engineering. However, some classes are historically more related to computer science (e.g. data structures and algorithms), and other to computer engineering (e.g. computer architecture). CSE is also a term often used in Europe to translate the name of technical or engineering informatics academic programs. It is offered in both undergraduate as well postgraduate with specializations.`;

  const eceDescription = `
Electronic engineering is a sub-discipline of electrical engineering that emerged in the early 20th century and is distinguished by the additional use of active components such as semiconductor devices to amplify and control electric current flow. Previously electrical engineering only used passive devices such as mechanical switches, resistors, inductors, and capacitors.

It covers fields such as analog electronics, digital electronics, consumer electronics, embedded systems and power electronics. It is also involved in many related fields, for example solid-state physics, radio engineering, telecommunications, control systems, signal processing, systems engineering, computer engineering, instrumentation engineering, electric power control, photonics and robotics.

The Institute of Electrical and Electronics Engineers (IEEE) is one of the most important professional bodies for electronics engineers in the US; the equivalent body in the UK is the Institution of Engineering and Technology (IET). The International Electrotechnical Commission (IEC) publishes electrical standards including those for electronics engineering.`;

  return (
    <ScrollView flex={1} px={5} py={8} bg="white">
      {/* Back button */}
      <Pressable
        onPress={onBack}
        position="absolute"
        top={-20}
        left={-10}
        zIndex={1}
      >
        <Box bg="primary.500" px={4} py={2} rounded="md" shadow={2}>
          <Text color="white" fontWeight="bold">
            ← Back
          </Text>
        </Box>
      </Pressable>

      <VStack space={4} mt={12}>
        <Heading size="xl" color="primary.600" textAlign="center">
          Welcome, Guest
        </Heading>

        <Text>
          You’re currently viewing the guest screen. As a guest, you can explore
          basic information about MIIT and its departments.
        </Text>

        <Divider my={2} />

        <Heading size="md" color="primary.500">
          📍 Location
        </Heading>
        <Text>
          MIIT is located in <Text bold>Mandalay, Myanmar</Text>. A joint
          initiative by Myanmar and India.
        </Text>
        <Button mt={2} onPress={openMap}>
          View MIIT Location
        </Button>

        <Divider my={2} />

        <Heading size="md" color="primary.500">
          🎓 Majors
        </Heading>

        <Pressable onPress={() => setShowCSEInfo(!showCSEInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>CSE</Text>
            <Text>Computer Science and Engineering</Text>
            {showCSEInfo && (
              <Text mt={2} fontSize="sm">
                {cseDescription.trim()}
              </Text>
            )}
          </Box>
        </Pressable>

        <Pressable onPress={() => setShowECEInfo(!showECEInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>ECE</Text>
            <Text>Electronics and Communication Engineering</Text>
            {showECEInfo && (
              <Text mt={2} fontSize="sm">
                {eceDescription.trim()}
              </Text>
            )}
          </Box>
        </Pressable>

        <Divider my={2} />

        <Heading size="md" color="primary.500">
          🧑‍🏫 Faculties
        </Heading>

        <Pressable onPress={() => setShowFCSInfo(!showFCSInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>FCS</Text>
            <Text>Faculty of Computer Science</Text>
            <Text mt={1}>HOD – Dr Zar Chi Su Su Hlaing</Text>
            {showFCSInfo && (
              <Text mt={2} fontSize="sm">
                The Faculty of Computer Science offers core subjects like
                Python, Web Development, C programming, Databases, and
                foundational courses in Machine Learning. It provides students
                with essential software development and problem-solving skills.
              </Text>
            )}
          </Box>
        </Pressable>

        <Pressable onPress={() => setShowFCEInfo(!showFCEInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>FCE</Text>
            <Text>Faculty of Computer Engineering</Text>
            <Text mt={1}>HOD – Dr Nu War</Text>
            {showFCEInfo && (
              <Text mt={2} fontSize="sm">
                The Faculty of Computer Engineering focuses on core ECE subjects
                including circuits, electronics, embedded systems, and digital
                communication. It bridges the gap between software and hardware.
              </Text>
            )}
          </Box>
        </Pressable>

        <Pressable onPress={() => setShowFCInfo(!showFCInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>FC</Text>
            <Text>Faculty of Computing</Text>
            <Text mt={1}>HOD – Dr Aye Aye Mon</Text>
            {showFCInfo && (
              <Text mt={2} fontSize="sm">
                The Faculty of Computing handles mathematical foundations for
                computing including Discrete Mathematics, Linear Algebra, and
                Complex Math, helping students understand theoretical concepts
                in computer science.
              </Text>
            )}
          </Box>
        </Pressable>

        <Pressable onPress={() => setShowFNSInfo(!showFNSInfo)}>
          <Box bg="coolGray.100" p={3} rounded="lg" shadow={1}>
            <Text bold>FNS</Text>
            <Text>Faculty of Natural Science</Text>
            <Text mt={1}>HOD – Dr Kay Thwal Kywal Aye</Text>
            {showFNSInfo && (
              <Text mt={2} fontSize="sm">
                The Faculty of Natural Science covers essential science courses
                such as Physics, Chemistry, and English, which support the
                scientific and communication skills necessary for all
                disciplines.
              </Text>
            )}
          </Box>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};

export default Guest;
