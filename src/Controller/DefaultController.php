<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function index()
    {
        return $this->render('default.html.twig');
    }

    public function happiness(Request $request)
    {
        return new JsonResponse(['result' => true]);
    }
}