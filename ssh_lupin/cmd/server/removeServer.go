/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package server

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"ssh_lupin/cmd"

	"github.com/spf13/cobra"
)

// removeCmd represents the remove command
var removeServerCmd = &cobra.Command{
	Use:   "remove",
	Short: "remove a server",
	Long:  `Removes a server with the given alias. The server will be deleted from the database.`,
	Run: func(cmd *cobra.Command, args []string) {

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter your username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter your password: ")
		fmt.Scan(&currentUserPassword)

		req, err := http.NewRequest("DELETE", fmt.Sprintf("http://localhost:3000/server/%s", args[0]), nil)
		if err != nil {
			fmt.Println("Error creating request:", err)
			os.Exit(1)
		}

		req.SetBasicAuth(currentUserUsername, currentUserPassword)
		req.Header.Set("Content-Type", "application/json")

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
	cmd.RootCmd.AddCommand(removeServerCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// removeCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// removeCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
