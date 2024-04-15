/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package server

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"ssh_lupin/cmd"

	"github.com/spf13/cobra"
)

// addUpdateCmd represents the addUpdate command
var addUpdateCmd = &cobra.Command{
	Use:   "addUpdate",
	Short: "add or update a server",
	Long:  `Adds or updates a server with the given username and email. If the server already exists, it will be updated.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Fetch command from arguments
		username := args[0]
		email := args[1]

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter your username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter your password: ")
		fmt.Scan(&currentUserPassword)

		// Prepare JSON payload
		requestBody := []byte(fmt.Sprintf(`{"username": "%s", "email": "%s"}`, username, email))
		req, err := http.NewRequest("Post", "http://localhost:3000/server/addUpdate", bytes.NewBuffer(requestBody))
		if err != nil {
			fmt.Println("Error executing SSH command: ", err)
			os.Exit(1)
		}

		req.SetBasicAuth(currentUserUsername, currentUserPassword)

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			fmt.Println("Error executing HTTP request:", err)
			os.Exit(1)
		}
		defer resp.Body.Close()

		// Read response body
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("Error reading response:", err)
			os.Exit(1)
		}

		// Print response
		fmt.Println(string(body))

	},
}

func init() {
	cmd.RootCmd.AddCommand(addUpdateCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// addUpdateCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// addUpdateCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
