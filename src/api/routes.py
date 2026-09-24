"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)

    if body is None:
        raise APIException(
            "Debes enviar un body en formato JSON", status_code=400)
    if "email" not in body or "password" not in body:
        raise APIException("email y password son requeridos", status_code=400)

    existing_user = User.query.filter_by(email=body["email"]).first()
    if existing_user is not None:
        raise APIException("Este correo ya está registrado", status_code=400)

    new_user = User(email=body["email"], is_active=True)
    new_user.set_password(body["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201


@api.route('/token', methods=['POST'])
def login():
    body = request.get_json(silent=True)

    if body is None or "email" not in body or "password" not in body:
        raise APIException("email y password son requeridos", status_code=400)

    user = User.query.filter_by(email=body["email"]).first()

    if user is None or not user.check_password(body["password"]):
        raise APIException("Correo o contraseña incorrectos", status_code=401)

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user": user.serialize()}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        raise APIException("Usuario no encontrado", status_code=404)

    return jsonify({"msg": "Bienvenido a la zona privada", "user": user.serialize()}), 200