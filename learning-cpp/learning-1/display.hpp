//
//  display.hpp
//  learning-1
//
//  Created by Tyler Angert on 6/2/17.
//  Copyright © 2017 Tyler Angert. All rights reserved.
//

#ifndef display_hpp
#define display_hpp

#include <stdio.h>
#include <string>

using namespace std;

class Display
{
public:
    Display(int width, int height, const string& title);
    virtual ~Display();
protected:
private:
    Display(const Display& other){}
    Display& operator=(const Display& other);
};

#endif /* display_hpp */
