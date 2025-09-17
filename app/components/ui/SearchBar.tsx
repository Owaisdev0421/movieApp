import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  editable?: boolean;
  onPress?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onSubmit,
  onClear,
  editable,
  onPress,
  autoFocus,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Feather name="search" size={20} color="#8F8F8F" />

      <TextInput
        style={styles.input}
        placeholder="TV shows, movies and more"
        placeholderTextColor="#8F8F8F"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        editable={editable}
        autoFocus={autoFocus}
      />

      <TouchableOpacity onPress={onClear} style={styles.clearButton}>
        <Feather name="x" size={25} color="#8F8F8F" />
      </TouchableOpacity>
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
  },
});
