//
//  display.cpp
//  learning-1
//
//  Created by Tyler Angert on 6/2/17.
//  Copyright © 2017 Tyler Angert. All rights reserved.
//

#include "display.hpp"
#include <iostream>
#include <string>

using namespace std;

Display::Display(int width, int height, const string& title)
{
    cout << "Consturctor" << endl;
}

Display:: ~Display()
{
    cout << "Destructor" << endl;
}
