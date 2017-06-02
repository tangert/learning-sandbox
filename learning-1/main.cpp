//
//  main.cpp
//  learning-1
//
//  Created by Tyler Angert on 6/2/17.
//  Copyright © 2017 Tyler Angert. All rights reserved.
//

#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <fstream>

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include "display.hpp"

using namespace std;

string LoadFileToString(const char* filepath)
{
    string fileData = "";
    ifstream stream(filepath, ios::in);
    
    if (stream.is_open())
    {
        string line = "";
        while ( getline(stream,line))
        {
            fileData += "\n" + line;
        }
        stream.close();
    }
    return fileData;
}


int initializeOpenGLWindow()
{
    GLFWwindow *window;
    
    //initialize the library
    if (!glfwInit())
    {
        cout << "Failed to initialize the library." << endl;
        return -1;
    }
    
    window = glfwCreateWindow(1280, 720, "Hello world", NULL, NULL);
    
    if (!window)
    {
        glfwTerminate();
        return -1;
    }
    
    // make the window's context current
    glfwMakeContextCurrent(window);
    
    //loop until the user closes window
    while (!glfwWindowShouldClose(window))
    {
        //clear what's on the screen every frame
        glClear(GL_COLOR_BUFFER_BIT);
        
        //render the OpenGL, put all OpenGL code here
        //swap front and back buffers
        
        glfwSwapBuffers(window);
        
        //poll for and process events
        glfwPollEvents();
    }
    
    glfwTerminate();
    return 0;
}

GLuint LoadShaders(const char* vertShaderPath, const char* fragShaderPath)
{
    
    //takes data and turns them into points
    GLuint vertShader = glCreateShader(GL_VERTEX_SHADER);
    GLuint fragShader = glCreateShader(GL_FRAGMENT_SHADER);
    
    string vertShaderSource = LoadFileToString(vertShaderPath);
    string fragShaderSource = LoadFileToString(fragShaderPath);
    
    //converts into raw c strings
    const char* rawVertShaderSource = vertShaderSource.c_str();
    const char* rawFragShaderSource = fragShaderSource.c_str();

    glShaderSource(vertShader,1,&rawVertShaderSource,NULL);
    glShaderSource(fragShader,1,&rawFragShaderSource,NULL);
    
    //compiles the shaders
    glCompileShader(vertShader);
    glCompileShader(fragShader);
    
    GLuint program = glCreateProgram();
    glAttachShader(program, vertShader);
    glAttachShader(program, fragShader);
    glLinkProgram(program);
    
    return program;
}

int main(int argc, const char * argv[])
{
    const char* title = "Hello world";
    Display display(1280, 780, title);
    
//    initializeOpenGLWindow();
}
