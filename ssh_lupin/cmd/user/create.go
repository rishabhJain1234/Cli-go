/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package user

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"ssh_lupin/cmd"

	"github.com/spf13/cobra"
)

// createCmd represents the create command
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "creates a new user",
	Long:  `Creates a new user with the given username and email`,
	Run: func(cmd *cobra.Command, args []string) {
		// Fetch command from arguments
		username := args[0]
		email := args[1]

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter current user's username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter current user's password: ")
		fmt.Scan(&currentUserPassword)

		// Prepare JSON payload
		requestBody := []byte(fmt.Sprintf(`{"username": "%s", "email": "%s"}`, username, email))
		req, err := http.NewRequest("POST", "http://localhost:3000/auth/create", bytes.NewBuffer(requestBody))
		req.Header.Set("Content-Type", "application/json")
		if err != nil {
			fmt.Println("Error creating request:", err)
			os.Exit(1)
		}

		// Set basic authentication credentials
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
	cmd.RootCmd.AddCommand(createCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// createCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// createCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
