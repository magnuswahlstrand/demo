package main

import (
	"io/ioutil"
	"log"
)

func main() {
	b, err := ioutil.ReadFile("d-1664536847.364227-4238898078.pgm")
	if err != nil {
		log.Fatalln(err)
	}

	for i := 0; i < 100; i++ {
		println(b[i])
	}
}
