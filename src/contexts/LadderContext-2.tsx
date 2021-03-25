import React, { useCallback, createContext, useState } from "react";
import API from "rest/api";
import { IRanks, IMatches } from "rest/ladder";



const defaultLadderContext = {
    ranks : {
        1 : {
            loading,
            lastLoaded,
            data
        }
    }
}