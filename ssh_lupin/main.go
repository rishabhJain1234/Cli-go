/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package main

import (
	"ssh_lupin/cmd"
	_ "ssh_lupin/cmd/request"
	_ "ssh_lupin/cmd/server"
	_ "ssh_lupin/cmd/user"
)

func main() {
	cmd.Execute()

}
