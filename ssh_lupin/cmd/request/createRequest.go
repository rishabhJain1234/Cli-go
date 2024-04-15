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

// createRequestCmd represents the createRequest command
var createRequestCmd = &cobra.Command{
	Use:   "createRequest",
	Short: "create a new request",
	Long:  `Creates a new request with the given alias. The request will be pending until it is approved by an admin.`,
	Run: func(cmd *cobra.Command, args []string) {
		alias := args[0]

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter your username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter your password: ")
		fmt.Scan(&currentUserPassword)

		// Prepare JSON payload
		requestBody := []byte(fmt.Sprintf(`{"alias": "%s"}`, alias))
		req, err := http.NewRequest(http.MethodPut, "http://localhost:3000/request/create", bytes.NewBuffer(requestBody))
		if err != nil {
			fmt.Println("Error creating request:", err)
			os.Exit(1)
		}

		req.Header.Set("Content-Type", "application/json")
		req.SetBasicAuth(currentUserUsername, currentUserPassword)
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Error executing request:", err)
			os.Exit(1)
		}
		if err != nil {
			fmt.Println("Error executing SSH command: ", err)
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
	cmd.RootCmd.AddCommand(createRequestCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// createRequestCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// createRequestCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
