package main

import "github.com/gin-gonic/gin"

func main() {
  router := gin.Default()
  // make your API here
  router.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })

  router.Static("/swagger", "./node_modules/swagger-ui-dist")
  router.Run(":8080")
}
