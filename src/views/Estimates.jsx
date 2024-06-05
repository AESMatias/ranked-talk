import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { colors } from '../../generalColors.js';
import { UserContext } from '../../App.js';
import { playSound } from '../utils/tapSound.jsx';

export const Estimates = ({ navigation }) => {


    const { user } = useContext(UserContext);

    const [score, setScore] = useState('100');
    const [requirement, setRequirement] = useState('50.0');
    const [minGrade, setMinGrade] = useState('1.0');
    const [maxGrade, setMaxGrade] = useState('7.0');
    const [passingGrade, setPassingGrade] = useState('4.0');
    const [increment, setIncrement] = useState('1.0');
    const [gradesTable, setGradesTable] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: `RateTalk - Estimations`,
        });
        playSound();
    }, []);
    const calculateGrade = () => {
        // Parse input values to numbers
        const parsedScore = parseFloat(score);
        const parsedRequirement = parseFloat(requirement);
        const parsedMinGrade = parseFloat(minGrade);
        const parsedMaxGrade = parseFloat(maxGrade);
        const parsedPassingGrade = parseFloat(passingGrade);
        const parsedIncrement = parseFloat(increment);

        // Calculate the estimated final grade
        const remainingScore = Math.max(parsedRequirement - parsedScore, 0); // Ajuste mínimo
        const remainingSteps = Math.ceil(remainingScore / parsedIncrement);
        const maxAchievableGrade = Math.min(parsedScore + remainingSteps * parsedIncrement, parsedMaxGrade); // Ajuste máximo

        // Validate if max achievable grade exceeds maximum allowed grade
        const finalGrade = Math.min(maxAchievableGrade, parsedMaxGrade);
        // Check if the final grade is above passing grade
        const result = finalGrade >= parsedPassingGrade ? 'Approved' : 'Not Approved';

        console.log(`Estimated final grade: ${finalGrade}`);
        console.log(`Result: ${result}`);

        // Generate grades table
        const table = [];
        for (let i = 0; i < 16; i += 1) {
            const grade = parsedMinGrade + i * parsedIncrement;
            const row = `${grade.toFixed(1)}\t${(i / 10 + parsedMinGrade).toFixed(1)}`;
            table.push(row);
        }
        setGradesTable(table);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.background}>
                <Text style={styles.text}>{user?.username} Estimate your grades here</Text>

                {/* Input fields for grade calculation */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Score:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="100.0"
                        keyboardType="numeric"
                        value={score}
                        onChangeText={setScore}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Requirement:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="50"
                        keyboardType="numeric"
                        value={requirement}
                        onChangeText={setRequirement}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Min Grade:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="1.0"
                        keyboardType="numeric"
                        value={minGrade}
                        onChangeText={setMinGrade}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Max Grade:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="7.0"
                        keyboardType="numeric"
                        value={maxGrade}
                        onChangeText={setMaxGrade}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Passing Grade:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="4.0"
                        keyboardType="numeric"
                        value={passingGrade}
                        onChangeText={setPassingGrade}
                    />
                </View>
                {/* <View style={styles.inputContainer}>
                    <Text style={styles.label}>Increment:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="1.0"
                        keyboardType="numeric"
                        value={increment}
                        onChangeText={setIncrement}
                    />
                </View> */}

                {/* Button to calculate grade */}
                <TouchableOpacity style={styles.button} onPress={calculateGrade}>
                    <Text style={styles.buttonText}>Calculate Grade</Text>
                </TouchableOpacity>

                {/* Display grades table */}
                <View style={styles.tableContainer}>
                    <Text style={styles.tableHeader}>Puntaje{'\t'}Nota</Text>
                    {gradesTable.map((row, index) => (
                        <Text key={index} style={styles.tableRow}>{row}</Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        marginTop: 80,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        color: 'white',
        marginRight: 10,
    },
    input: {
        width: 200,
        height: 40,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    button: {
        width: 200,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        marginVertical: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 2,
    },
    tableContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    tableHeader: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    tableRow: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        width: 80, // Ancho fijo para cada roww
    },
    scrollContainer: {
        backgroundColor: colors.background,
        color: colors.background,
    },
});

export default Estimates;