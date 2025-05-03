import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import Header from "../components/Header";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Tic Tac Toe" />
      <View style={styles.content}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          {board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => handlePress(index)}
            >
              <Text style={styles.cellText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {(winner || !board.includes(null)) && (
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetText}>Start New Game</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    justifyContent: "space-between",
  },
  cell: {
    width: "30%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    marginBottom: "2%",
  },
  cellText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TicTacToe;
