package main
import (  
    "fmt"
    "io/ioutil"
	"strconv"
	"strings"
)

func countDepths(v string) int {
	numbers := strings.Fields(v)
	acc := 0

	for i := 0; i < len(numbers); i++ {
		if i > 0 {
			if numbers[i] > numbers[i-1] {
				acc++
			}
		}
	}

	return acc
}

func countSumDepths(v string) int {
	var s []string
	numbers := strings.Fields(v)

	for i := 0; i < len(numbers); i++ {
		if i+1 == len(numbers) {
			break
		}

		if i > 0 {
			pre, _ := strconv.Atoi(numbers[i-1])
			act, _ := strconv.Atoi(numbers[i])
			next, _ := strconv.Atoi(numbers[i+1])
			tot := pre + act + next
			s = append(s, string(tot))
		}
	}

	sstring := strings.Join(s,"\n")
	return countDepths(sstring)
}

func main() {  
    data, err := ioutil.ReadFile("input.txt")
    if err != nil {
        fmt.Println("File reading error", err)
        return
    }

	counter := countDepths(string(data))
	totalCounter := countSumDepths(string(data))

	fmt.Println(counter, totalCounter)
}