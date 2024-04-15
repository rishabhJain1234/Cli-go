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

// makeAdminCmd represents the makeAdmin command
var makeAdminCmd = &cobra.Command{
	Use:   "makeAdmin",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
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
		req, err := http.NewRequest("POST", "http://localhost:3000/auth/makeAdmin", bytes.NewBuffer(requestBody))
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
	cmd.RootCmd.AddCommand(makeAdminCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// makeAdminCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// makeAdminCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
