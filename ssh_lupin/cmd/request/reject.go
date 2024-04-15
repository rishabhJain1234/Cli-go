/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package request

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"ssh_lupin/cmd"

	"github.com/spf13/cobra"
)

// rejectCmd represents the reject command
var rejectCmd = &cobra.Command{
	Use:   "reject",
	Short: "rejects the request",
	Long:  `Rejects a new request with the given alias and username.`,
	Run: func(cmd *cobra.Command, args []string) {
		alias := args[0]
		username := args[1]

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter your username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter your password: ")
		fmt.Scan(&currentUserPassword)

		// Prepare JSON payload
		requestBody := []byte(fmt.Sprintf(`{"alias": "%s", "username": "%s"}`, alias, username))
		req, err := http.NewRequest(http.MethodPut, "http://localhost:3000/request/reject", bytes.NewBuffer(requestBody))
		if err != nil {
			fmt.Println("Error rejecting request:", err)
			os.Exit(1)
		}

		req.Header.Set("Content-Type", "application/json")
		req.SetBasicAuth(currentUserUsername, currentUserPassword)
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Error rejecting request:", err)
			os.Exit(1)
		}
		if err != nil {
			fmt.Println("Error rejecting request: ", err)
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
	cmd.RootCmd.AddCommand(rejectCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// rejectCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// rejectCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
