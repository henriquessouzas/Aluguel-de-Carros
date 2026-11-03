package com.aluguelcarros.exception;

public class StatusTransitionException extends RuntimeException {
    public StatusTransitionException(String message) {
        super(message);
    }
}
