package main

import (
	"fmt"
	"image"
	_ "image/png"
	"log"
	"math"
	"os"
	"strings"
)

func getImageFromFilePath(filePath string) (image.Image, error) {

	f, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	image, _, err := image.Decode(f)
	return image, err
}

func main() {
	img, err := getImageFromFilePath("./public/heightmap.png")
	if err != nil {
		log.Fatal(err)
	}

	t := [][]float64{}
	width, height := img.Bounds().Max.X, img.Bounds().Max.Y
	rate := 4
	modifier := 3.0
	for i := 0; i < width/rate; i++ {
		var s []float64
		for j := 0; j < height/rate; j++ {
			r, _, _, _ := img.At(i*rate, j*rate).RGBA()
			s = append(s, modifier*math.Floor(100*float64(r)/(256*256))/100)
		}
		t = append(t, s)
	}
	s := strings.ReplaceAll(fmt.Sprintln(t), " ", ",")
	fmt.Println(s)
}
