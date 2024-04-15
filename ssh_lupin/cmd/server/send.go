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

// sendCmd represents the send command
var sendCmd = &cobra.Command{
	Use:   "send",
	Short: "send private keys",
	Long:  `Sends the private keys to the user with the given alias. The user must have an approved request to receive the keys`,
	Run: func(cmd *cobra.Command, args []string) {

		var currentUserUsername, currentUserPassword string
		fmt.Print("Enter your username: ")
		fmt.Scan(&currentUserUsername)
		fmt.Print("Enter your password: ")
		fmt.Scan(&currentUserPassword)

		req, err := http.NewRequest("GET", fmt.Sprintf("http://localhost:3000/server/send/%s", args[0]), nil)
		if err != nil {
			fmt.Println("Error creating request:", err)
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
	cmd.RootCmd.AddCommand(sendCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// sendCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// sendCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
